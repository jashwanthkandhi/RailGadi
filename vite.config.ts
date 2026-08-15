import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const mockTrains = [
  {
    id: '12727',
    number: '12727',
    name: 'Godavari Express',
    source: 'Hyderabad Decan (HYB)',
    destination: 'Visakhapatnam Jn (VSKP)',
    totalDistanceKm: 705,
    trainType: 'Superfast Express',
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  {
    id: '12626',
    number: '12626',
    name: 'Kerala Superfast Express',
    source: 'New Delhi (NDLS)',
    destination: 'Trivandrum Central (TVC)',
    totalDistanceKm: 3031,
    trainType: 'Superfast Express',
    runsOn: ['Daily']
  },
  {
    id: '12951',
    number: '12951',
    name: 'Mumbai Rajdhani Express',
    source: 'Mumbai Central (MMCT)',
    destination: 'New Delhi (NDLS)',
    totalDistanceKm: 1384,
    trainType: 'Rajdhani',
    runsOn: ['Daily']
  },
  {
    id: '22436',
    number: '22436',
    name: 'Vande Bharat Express',
    source: 'New Delhi (NDLS)',
    destination: 'Varanasi Jn (BSB)',
    totalDistanceKm: 759,
    trainType: 'Vande Bharat',
    runsOn: ['Sun', 'Mon', 'Tue', 'Wed', 'Fri', 'Sat']
  },
  {
    id: '12002',
    number: '12002',
    name: 'Bhopal Shatabdi Express',
    source: 'New Delhi (NDLS)',
    destination: 'Rani Kamlapati (RKMP)',
    totalDistanceKm: 708,
    trainType: 'Shatabdi',
    runsOn: ['Daily']
  }
];

const mockJourney = {
  id: 'j-12727',
  trainId: '12727',
  train: mockTrains[0],
  status: 'DELAYED',
  delayMinutes: 14,
  location: { latitude: 17.965, longitude: 79.591 },
  speedKmph: 92,
  headingDegrees: 78,
  progress: {
    percentage: 68,
    distanceCoveredKm: 479,
    distanceRemainingKm: 226,
    totalDistanceKm: 705
  },
  updatedAt: new Date().toISOString(),
  currentStation: {
    id: 'st-sc',
    code: 'SC',
    name: 'Secunderabad Junction',
    latitude: 17.4339,
    longitude: 78.5017,
    sequence: 2,
    scheduledArrival: '17:15',
    actualArrival: '17:22',
    scheduledDeparture: '17:30',
    actualDeparture: '17:42',
    delayMinutes: 12,
    status: 'COMPLETED',
    elevationMeters: 543
  },
  nextStation: {
    id: 'st-kzj',
    code: 'KZJ',
    name: 'Kazipet Junction',
    latitude: 17.9784,
    longitude: 79.5217,
    sequence: 3,
    scheduledArrival: '19:13',
    actualArrival: '19:27',
    scheduledDeparture: '19:15',
    actualDeparture: '19:29',
    delayMinutes: 14,
    status: 'CURRENT',
    elevationMeters: 268
  },
  destination: {
    id: 'st-vskp',
    code: 'VSKP',
    name: 'Visakhapatnam Junction',
    latitude: 17.7231,
    longitude: 83.2872,
    sequence: 9,
    scheduledArrival: '05:45',
    actualArrival: '05:59',
    scheduledDeparture: '05:45',
    actualDeparture: '05:59',
    delayMinutes: 14,
    status: 'UPCOMING',
    elevationMeters: 4
  },
  stations: [
    {
      id: 'st-hyb',
      code: 'HYB',
      name: 'Hyderabad Deccan',
      latitude: 17.3916,
      longitude: 78.4682,
      sequence: 1,
      scheduledArrival: '17:00',
      actualArrival: '17:00',
      scheduledDeparture: '17:00',
      actualDeparture: '17:05',
      delayMinutes: 5,
      status: 'COMPLETED',
      elevationMeters: 505,
      platformNumber: 'PF 5',
      haltMinutes: 5,
      amenities: ['📶 Free WiFi', '🍔 Food Court', '🛋️ Executive Lounge', '♿ Accessible', 'ATM']
    },
    {
      id: 'st-sc',
      code: 'SC',
      name: 'Secunderabad Junction',
      latitude: 17.4339,
      longitude: 78.5017,
      sequence: 2,
      scheduledArrival: '17:15',
      actualArrival: '17:22',
      scheduledDeparture: '17:30',
      actualDeparture: '17:42',
      delayMinutes: 12,
      status: 'COMPLETED',
      elevationMeters: 543,
      platformNumber: 'PF 1',
      haltMinutes: 15,
      amenities: ['📶 Free WiFi', '🍔 Food Court', 'Cloakroom', '🛋️ Executive Lounge', '♿ Accessible', 'ATM']
    },
    {
      id: 'st-kzj',
      code: 'KZJ',
      name: 'Kazipet Junction',
      latitude: 17.9784,
      longitude: 79.5217,
      sequence: 3,
      scheduledArrival: '19:13',
      actualArrival: '19:27',
      scheduledDeparture: '19:15',
      actualDeparture: '19:29',
      delayMinutes: 14,
      status: 'CURRENT',
      elevationMeters: 268,
      platformNumber: 'PF 2',
      haltMinutes: 2,
      amenities: ['📶 Free WiFi', 'Tea & Snacks Stall', '♿ Accessible']
    },
    {
      id: 'st-vskp',
      code: 'VSKP',
      name: 'Visakhapatnam Junction',
      latitude: 17.7231,
      longitude: 83.2872,
      sequence: 9,
      scheduledArrival: '05:45',
      actualArrival: '05:59',
      scheduledDeparture: '05:45',
      actualDeparture: '05:59',
      delayMinutes: 14,
      status: 'UPCOMING',
      elevationMeters: 4,
      platformNumber: 'PF 8',
      haltMinutes: 0,
      amenities: ['📶 Free WiFi', '🍔 Food Plaza', 'Retiring Rooms', '🛋️ Executive Lounge', '♿ Accessible', 'ATM']
    }
  ]
};

function apiMockPlugin() {
  return {
    name: 'api-mock-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (!req.url) return next();

        // Backend Root API Health Check
        if (req.url === '/api' || req.url === '/api/') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok', name: 'RailGaadi Backend API', version: '2.0.0' }));
          return;
        }

        // Train Search API
        if (req.url.startsWith('/api/v1/trains/search')) {
          const urlObj = new URL(req.url, 'http://localhost');
          const q = (urlObj.searchParams.get('q') || '').toLowerCase();
          const filtered = mockTrains.filter(
            (t) =>
              t.number.includes(q) ||
              t.name.toLowerCase().includes(q) ||
              t.source.toLowerCase().includes(q) ||
              t.destination.toLowerCase().includes(q)
          );
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ trains: filtered }));
          return;
        }

        // Live Journey API
        if (req.url.match(/\/api\/v1\/trains\/[^/]+\/live/)) {
          const parts = req.url.split('?')[0].split('/');
          // url format: /api/v1/trains/{trainId}/live -> parts: ['', 'api', 'v1', 'trains', '{trainId}', 'live']
          const trainId = parts[parts.length - 2] || '12727';
          
          let targetTrain = mockTrains.find((t) => t.id === trainId || t.number === trainId) || mockTrains[0];
          
          let journeyData = {
            ...mockJourney,
            id: `j-${targetTrain.id}`,
            trainId: targetTrain.id,
            train: targetTrain,
            updatedAt: new Date().toISOString()
          };

          if (trainId === '22436') {
            journeyData = {
              ...journeyData,
              status: 'ON_TIME',
              delayMinutes: 0,
              location: { latitude: 26.0500, longitude: 81.1000 },
              speedKmph: 130,
              progress: { percentage: 48, distanceCoveredKm: 364, distanceRemainingKm: 395, totalDistanceKm: 759 },
              stations: [
                { id: 'st-ndls', code: 'NDLS', name: 'New Delhi', latitude: 28.6139, longitude: 77.2090, sequence: 1, scheduledArrival: '06:00', actualArrival: '06:00', scheduledDeparture: '06:00', actualDeparture: '06:00', delayMinutes: 0, status: 'COMPLETED', elevationMeters: 216, platformNumber: 'PF 16', haltMinutes: 0, amenities: ['📶 WiFi', '🍔 Lounge'] },
                { id: 'st-cnb', code: 'CNB', name: 'Kanpur Central', latitude: 26.4542, longitude: 80.3500, sequence: 2, scheduledArrival: '09:30', actualArrival: '09:30', scheduledDeparture: '09:35', actualDeparture: '09:35', delayMinutes: 0, status: 'COMPLETED', elevationMeters: 126, platformNumber: 'PF 5', haltMinutes: 5, amenities: ['📶 WiFi', '☕ Snacks'] },
                { id: 'st-pryj', code: 'PRYJ', name: 'Prayagraj Junction', latitude: 25.4358, longitude: 81.8463, sequence: 3, scheduledArrival: '12:08', actualArrival: '12:08', scheduledDeparture: '12:10', actualDeparture: '12:10', delayMinutes: 0, status: 'CURRENT', elevationMeters: 98, platformNumber: 'PF 6', haltMinutes: 2, amenities: ['📶 WiFi'] },
                { id: 'st-bsb', code: 'BSB', name: 'Varanasi Junction', latitude: 25.3176, longitude: 82.9739, sequence: 4, scheduledArrival: '14:00', actualArrival: '14:00', scheduledDeparture: '14:00', actualDeparture: '14:00', delayMinutes: 0, status: 'UPCOMING', elevationMeters: 76, platformNumber: 'PF 1', haltMinutes: 0, amenities: ['📶 WiFi', '🍔 Food Plaza'] }
              ]
            };
          } else if (trainId === '12951') {
            journeyData = {
              ...journeyData,
              status: 'ON_TIME',
              delayMinutes: 2,
              location: { latitude: 23.8000, longitude: 74.2000 },
              speedKmph: 120,
              progress: { percentage: 55, distanceCoveredKm: 761, distanceRemainingKm: 623, totalDistanceKm: 1384 },
              stations: [
                { id: 'st-mmct', code: 'MMCT', name: 'Mumbai Central', latitude: 18.9696, longitude: 72.8193, sequence: 1, scheduledArrival: '17:00', actualArrival: '17:00', scheduledDeparture: '17:00', actualDeparture: '17:00', delayMinutes: 0, status: 'COMPLETED', elevationMeters: 7, platformNumber: 'PF 1', haltMinutes: 0, amenities: ['📶 WiFi', '🍔 Lounge'] },
                { id: 'st-st', code: 'ST', name: 'Surat', latitude: 21.2036, longitude: 72.8398, sequence: 2, scheduledArrival: '19:43', actualArrival: '19:43', scheduledDeparture: '19:48', actualDeparture: '19:48', delayMinutes: 0, status: 'COMPLETED', elevationMeters: 14, platformNumber: 'PF 1', haltMinutes: 5, amenities: ['📶 WiFi'] },
                { id: 'st-brc', code: 'BRC', name: 'Vadodara Junction', latitude: 22.3072, longitude: 73.1812, sequence: 3, scheduledArrival: '20:38', actualArrival: '20:40', scheduledDeparture: '20:48', actualDeparture: '20:50', delayMinutes: 2, status: 'COMPLETED', elevationMeters: 36, platformNumber: 'PF 2', haltMinutes: 10, amenities: ['📶 WiFi', '☕ Snacks'] },
                { id: 'st-kota', code: 'KOTA', name: 'Kota Junction', latitude: 25.2138, longitude: 75.8648, sequence: 4, scheduledArrival: '03:15', actualArrival: '03:17', scheduledDeparture: '03:25', actualDeparture: '03:27', delayMinutes: 2, status: 'CURRENT', elevationMeters: 256, platformNumber: 'PF 1', haltMinutes: 10, amenities: ['📶 WiFi', '🍔 Food Court'] },
                { id: 'st-ndls', code: 'NDLS', name: 'New Delhi', latitude: 28.6139, longitude: 77.2090, sequence: 5, scheduledArrival: '08:32', actualArrival: '08:34', scheduledDeparture: '08:32', actualDeparture: '08:34', delayMinutes: 2, status: 'UPCOMING', elevationMeters: 216, platformNumber: 'PF 1', haltMinutes: 0, amenities: ['📶 WiFi', '🍔 Lounge'] }
              ]
            };
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(journeyData));
          return;
        }

        // Single Train Metadata API
        if (req.url.match(/\/api\/v1\/trains\/[^/]+/)) {
          const parts = req.url.split('/');
          const trainId = parts[parts.length - 1];
          const train = mockTrains.find((t) => t.id === trainId) || mockTrains[0];
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(train));
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiMockPlugin()],
  optimizeDeps: {
    exclude: ['maplibre-gl']
  }
});

