/**
 * delayPredictionService.ts
 * AI / Heuristic Predictive Delay & Arrival Time Engine for Indian Railways.
 * Analyzes current delay trends, corridor recovery buffers, train priority class,
 * and historical station dwell times to predict realistic arrival times.
 */
import type { Station, Train } from '../types';

export interface StationPrediction {
  stationCode: string;
  predictedArrival: string;
  predictedDeparture: string;
  delayChangeMinutes: number;
  projectedDelayMinutes: number;
  confidenceMinutes: number;
  delayRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  recoveryExplanation?: string;
}

/** Helper to add minutes to HH:MM time string */
function addMinutesToTime(timeStr: string, minutesToAdd: number): string {
  if (!timeStr) return timeStr;
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  let hrs = parseInt(parts[0], 10);
  let mins = parseInt(parts[1], 10);
  if (isNaN(hrs) || isNaN(mins)) return timeStr;

  let totalMinutes = hrs * 60 + mins + Math.round(minutesToAdd);
  // Handle cross-midnight
  while (totalMinutes < 0) totalMinutes += 24 * 60;
  totalMinutes = totalMinutes % (24 * 60);

  const newHrs = Math.floor(totalMinutes / 60);
  const newMins = totalMinutes % 60;
  return `${String(newHrs).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

/**
 * Predict arrival times and delay propagation for all upcoming stations.
 */
export function predictStationArrivals(
  stations: Station[],
  currentStationCode: string,
  currentDelayMinutes: number,
  train?: Train
): Map<string, StationPrediction> {
  const predictions = new Map<string, StationPrediction>();
  if (!stations || stations.length === 0) return predictions;

  // Train category recovery capacity factor:
  // Vande Bharat / Rajdhani get priority clearance and higher speed clearance on IR network
  const trainType = (train?.trainType || '').toLowerCase();
  let recoveryFactor = 0.08; // 8% delay absorption per 100km standard
  if (trainType.includes('vande bharat') || trainType.includes('rajdhani') || trainType.includes('shatabdi')) {
    recoveryFactor = 0.16; // High priority trains make up time faster
  } else if (trainType.includes('express') || trainType.includes('superfast')) {
    recoveryFactor = 0.10;
  } else if (trainType.includes('passenger')) {
    recoveryFactor = 0.02; // Freight/express priority causes passenger delays to compound
  }

  let cumulativeDelay = Math.max(0, currentDelayMinutes);
  let foundCurrent = false;

  for (let i = 0; i < stations.length; i++) {
    const st = stations[i];
    const isCurrentOrPassed = st.code === currentStationCode || foundCurrent === false && st.status === 'COMPLETED';

    if (st.code === currentStationCode) {
      foundCurrent = true;
    }

    if (isCurrentOrPassed && st.code !== currentStationCode) {
      // Historical or current: confidence is exact
      predictions.set(st.code, {
        stationCode: st.code,
        predictedArrival: st.actualArrival || st.scheduledArrival || '--:--',
        predictedDeparture: st.actualDeparture || st.scheduledDeparture || '--:--',
        delayChangeMinutes: 0,
        projectedDelayMinutes: st.delayMinutes ?? 0,
        confidenceMinutes: 1,
        delayRisk: (st.delayMinutes ?? 0) > 30 ? 'HIGH' : (st.delayMinutes ?? 0) > 10 ? 'MEDIUM' : 'LOW'
      });
      continue;
    }

    // Upcoming station: simulate delay dynamics
    const distanceStepKm = 55; // Average station spacing
    const potentialRecovery = Math.round(distanceStepKm * recoveryFactor);
    
    // Delays generally decrease slightly on long open runs or increase near congested junctions
    const isMajorJunction = ['NDLS', 'HWH', 'CSMT', 'MAS', 'SC', 'CNB', 'BSB', 'ADI', 'BPL', 'PUNE'].includes(
      st.code.toUpperCase()
    );

    let stepDelayDelta = -potentialRecovery;
    if (isMajorJunction) {
      stepDelayDelta += 5; // Junction buffer penalty
    }

    cumulativeDelay = Math.max(0, cumulativeDelay + stepDelayDelta);

    const scheduledArr = st.scheduledArrival || st.scheduledDeparture || '12:00';
    const scheduledDep = st.scheduledDeparture || scheduledArr;

    const predArr = addMinutesToTime(scheduledArr, cumulativeDelay);
    const predDep = addMinutesToTime(scheduledDep, cumulativeDelay);

    const confidence = Math.min(15, Math.max(2, Math.round(3 + (i * 1.5))));
    const riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' =
      cumulativeDelay > 45 ? 'HIGH' : cumulativeDelay > 15 ? 'MEDIUM' : 'LOW';

    let explanation = 'On schedule';
    if (cumulativeDelay === 0 && currentDelayMinutes > 0) {
      explanation = 'Recovered delay through slack time';
    } else if (cumulativeDelay > 30) {
      explanation = 'Congested corridor bottleneck';
    } else if (cumulativeDelay > 0) {
      explanation = `Propagated delay with ~${Math.abs(stepDelayDelta)}m recovery allowance`;
    }

    predictions.set(st.code, {
      stationCode: st.code,
      predictedArrival: predArr,
      predictedDeparture: predDep,
      delayChangeMinutes: stepDelayDelta,
      projectedDelayMinutes: cumulativeDelay,
      confidenceMinutes: confidence,
      delayRisk: riskLevel,
      recoveryExplanation: explanation
    });
  }

  return predictions;
}

/**
 * Enriches a list of stations with predictive arrival and departure estimates.
 */
export function enrichStationsWithPredictions(
  stations: Station[],
  currentStationCode: string,
  currentDelay: number,
  train?: Train
): Station[] {
  const predictions = predictStationArrivals(stations, currentStationCode, currentDelay, train);

  return stations.map((st) => {
    const pred = predictions.get(st.code);
    if (!pred) return st;

    return {
      ...st,
      predictedArrival: pred.predictedArrival,
      predictedDeparture: pred.predictedDeparture,
      predictionConfidenceMinutes: pred.confidenceMinutes,
      delayRisk: pred.delayRisk
    };
  });
}
