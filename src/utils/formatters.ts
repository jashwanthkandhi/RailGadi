import type { JourneyStatus } from '../types';

export const formatDelay = (minutes: number): { text: string; statusClass: string; color: string } => {
  if (!minutes || minutes <= 0) {
    return { text: 'On time', statusClass: 'status-on-time', color: '#10b981' };
  }
  if (minutes < 60) {
    return { text: `+${minutes} min`, statusClass: 'status-delayed', color: '#f59e0b' };
  }
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  const text = rem > 0 ? `+${hours}h ${rem}m` : `+${hours}h`;
  return { text, statusClass: 'status-heavy-delay', color: '#ef4444' };
};

export const getStatusBadgeInfo = (status: JourneyStatus, delayMinutes: number = 0) => {
  switch (status) {
    case 'ON_TIME':
      return { label: 'ON TIME', bg: 'var(--status-on-time-bg)', color: 'var(--status-on-time)' };
    case 'DELAYED':
      return {
        label: delayMinutes > 45 ? `DELAYED ${formatDelay(delayMinutes).text}` : `+${delayMinutes} MIN DELAY`,
        bg: delayMinutes > 45 ? 'var(--status-heavy-delay-bg)' : 'var(--status-delayed-bg)',
        color: delayMinutes > 45 ? 'var(--status-heavy-delay)' : 'var(--status-delayed)'
      };
    case 'APPROACHING':
      return { label: 'APPROACHING', bg: 'var(--status-approaching-bg)', color: 'var(--status-approaching)' };
    case 'AT_STATION':
      return { label: 'AT STATION', bg: 'var(--status-at-station-bg)', color: 'var(--status-at-station)' };
    case 'DEPARTED':
      return { label: 'DEPARTED', bg: 'var(--status-on-time-bg)', color: 'var(--status-on-time)' };
    case 'COMPLETED':
      return { label: 'JOURNEY COMPLETED', bg: 'rgba(148, 163, 184, 0.2)', color: '#94a3b8' };
    case 'NOT_RUNNING':
      return { label: 'NOT OPERATING', bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' };
    default:
      return { label: 'LIVE STATUS', bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' };
  }
};

export const formatDistance = (km: number): string => {
  return `${Math.round(km)} km`;
};

export const formatTimeAgo = (isoString: string): string => {
  try {
    const diffMs = new Date().getTime() - new Date(isoString).getTime();
    const diffSec = Math.max(0, Math.floor(diffMs / 1000));
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffHr = Math.floor(diffMin / 60);
    return `${diffHr}h ago`;
  } catch {
    return 'Recently';
  }
};
