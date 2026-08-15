import type { Train, LiveJourney, Weather, ElevationPoint, GeographicFeature } from '../types';

export const MOCK_TRAINS: Train[] = [
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

export const MOCK_GODAVARI_JOURNEY: LiveJourney = {
  id: 'j-12727',
  trainId: '12727',
  train: MOCK_TRAINS[0],
  status: 'DELAYED',
  delayMinutes: 14,
  location: {
    latitude: 17.965,
    longitude: 79.591
  },
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
      amenities: ['📶 Free WiFi', '🍔 Food Court', '🛋️ Executive Lounge', '♿ Accessible', '🏧 ATM']
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
      amenities: ['📶 Free WiFi', '🍔 Food Court', '🛄 Cloakroom', '🛋️ Executive Lounge', '♿ Accessible', '🏧 ATM']
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
      amenities: ['📶 Free WiFi', '☕ Tea & Snacks Stall', '♿ Accessible']
    },
    {
      id: 'st-bza',
      code: 'BZA',
      name: 'Vijayawada Junction',
      latitude: 16.5193,
      longitude: 80.6305,
      sequence: 4,
      scheduledArrival: '23:30',
      actualArrival: '23:44',
      scheduledDeparture: '23:45',
      actualDeparture: '23:59',
      delayMinutes: 14,
      status: 'UPCOMING',
      elevationMeters: 20,
      platformNumber: 'PF 6',
      haltMinutes: 15,
      amenities: ['📶 Free WiFi', '🍔 Food Court', '🛄 Cloakroom', '🛋️ AC Waiting Room', '♿ Accessible']
    },
    {
      id: 'st-eew',
      code: 'EE',
      name: 'Eluru',
      latitude: 16.7107,
      longitude: 81.1044,
      sequence: 5,
      scheduledArrival: '00:38',
      actualArrival: '00:52',
      scheduledDeparture: '00:40',
      actualDeparture: '00:54',
      delayMinutes: 14,
      status: 'UPCOMING',
      elevationMeters: 13,
      platformNumber: 'PF 3',
      haltMinutes: 2,
      amenities: ['☕ Refreshment Stall', '♿ Accessible']
    },
    {
      id: 'st-rjy',
      code: 'RJY',
      name: 'Rajahmundry',
      latitude: 16.9891,
      longitude: 81.7838,
      sequence: 6,
      scheduledArrival: '01:53',
      actualArrival: '02:07',
      scheduledDeparture: '01:55',
      actualDeparture: '02:09',
      delayMinutes: 14,
      status: 'UPCOMING',
      elevationMeters: 14,
      platformNumber: 'PF 1',
      haltMinutes: 2,
      amenities: ['📶 Free WiFi', '☕ Food Stall', '🛋️ AC Waiting Room']
    },
    {
      id: 'st-slo',
      code: 'SLO',
      name: 'Samalkot Junction',
      latitude: 17.0506,
      longitude: 82.1678,
      sequence: 7,
      scheduledArrival: '02:38',
      actualArrival: '02:52',
      scheduledDeparture: '02:40',
      actualDeparture: '02:54',
      delayMinutes: 14,
      status: 'UPCOMING',
      elevationMeters: 19,
      platformNumber: 'PF 2',
      haltMinutes: 2,
      amenities: ['☕ Refreshment Stall', '♿ Accessible']
    },
    {
      id: 'st-akp',
      code: 'AKP',
      name: 'Anakapalle',
      latitude: 17.6896,
      longitude: 83.0033,
      sequence: 8,
      scheduledArrival: '04:28',
      actualArrival: '04:42',
      scheduledDeparture: '04:30',
      actualDeparture: '04:44',
      delayMinutes: 14,
      status: 'UPCOMING',
      elevationMeters: 31,
      platformNumber: 'PF 3',
      haltMinutes: 2,
      amenities: ['☕ Refreshment Stall']
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
      amenities: ['📶 Free WiFi', '🍔 Food Plaza', '🛄 Retiring Rooms', '🛋️ Executive Lounge', '♿ Accessible', '🏧 ATM']
    }
  ]
};

/** Vande Bharat Express (22436) */
export const MOCK_VANDE_BHARAT_JOURNEY: LiveJourney = {
  id: 'j-22436',
  trainId: '22436',
  train: MOCK_TRAINS[3],
  status: 'ON_TIME',
  delayMinutes: 0,
  location: { latitude: 26.0500, longitude: 81.1000 },
  speedKmph: 130,
  headingDegrees: 120,
  progress: { percentage: 48, distanceCoveredKm: 364, distanceRemainingKm: 395, totalDistanceKm: 759 },
  updatedAt: new Date().toISOString(),
  currentStation: {
    id: 'st-cnb', code: 'CNB', name: 'Kanpur Central', latitude: 26.4542, longitude: 80.3500, sequence: 2,
    scheduledArrival: '09:30', actualArrival: '09:30', scheduledDeparture: '09:35', actualDeparture: '09:35',
    delayMinutes: 0, status: 'COMPLETED', elevationMeters: 126, platformNumber: 'PF 5', haltMinutes: 5,
    amenities: ['📶 High-Speed WiFi', '🍔 Executive Lounge', '♿ Wheelchair Access']
  },
  nextStation: {
    id: 'st-pryj', code: 'PRYJ', name: 'Prayagraj Junction', latitude: 25.4358, longitude: 81.8463, sequence: 3,
    scheduledArrival: '12:08', actualArrival: '12:08', scheduledDeparture: '12:10', actualDeparture: '12:10',
    delayMinutes: 0, status: 'CURRENT', elevationMeters: 98, platformNumber: 'PF 6', haltMinutes: 2,
    amenities: ['📶 WiFi', '☕ Premium Vending']
  },
  destination: {
    id: 'st-bsb', code: 'BSB', name: 'Varanasi Junction', latitude: 25.3176, longitude: 82.9739, sequence: 4,
    scheduledArrival: '14:00', actualArrival: '14:00', scheduledDeparture: '14:00', actualDeparture: '14:00',
    delayMinutes: 0, status: 'UPCOMING', elevationMeters: 76, platformNumber: 'PF 1', haltMinutes: 0,
    amenities: ['📶 WiFi', '🍔 Food Plaza', '🛋️ Executive Lounge']
  },
  stations: [
    {
      id: 'st-ndls', code: 'NDLS', name: 'New Delhi', latitude: 28.6139, longitude: 77.2090, sequence: 1,
      scheduledArrival: '06:00', actualArrival: '06:00', scheduledDeparture: '06:00', actualDeparture: '06:00',
      delayMinutes: 0, status: 'COMPLETED', elevationMeters: 216, platformNumber: 'PF 16', haltMinutes: 0,
      amenities: ['📶 Free WiFi', '🍔 Food Court', '🛋️ Executive Lounge', '♿ Accessible']
    },
    {
      id: 'st-cnb', code: 'CNB', name: 'Kanpur Central', latitude: 26.4542, longitude: 80.3500, sequence: 2,
      scheduledArrival: '09:30', actualArrival: '09:30', scheduledDeparture: '09:35', actualDeparture: '09:35',
      delayMinutes: 0, status: 'COMPLETED', elevationMeters: 126, platformNumber: 'PF 5', haltMinutes: 5,
      amenities: ['📶 High-Speed WiFi', '🍔 Executive Lounge', '♿ Wheelchair Access']
    },
    {
      id: 'st-pryj', code: 'PRYJ', name: 'Prayagraj Junction', latitude: 25.4358, longitude: 81.8463, sequence: 3,
      scheduledArrival: '12:08', actualArrival: '12:08', scheduledDeparture: '12:10', actualDeparture: '12:10',
      delayMinutes: 0, status: 'CURRENT', elevationMeters: 98, platformNumber: 'PF 6', haltMinutes: 2,
      amenities: ['📶 WiFi', '☕ Premium Vending']
    },
    {
      id: 'st-bsb', code: 'BSB', name: 'Varanasi Junction', latitude: 25.3176, longitude: 82.9739, sequence: 4,
      scheduledArrival: '14:00', actualArrival: '14:00', scheduledDeparture: '14:00', actualDeparture: '14:00',
      delayMinutes: 0, status: 'UPCOMING', elevationMeters: 76, platformNumber: 'PF 1', haltMinutes: 0,
      amenities: ['📶 WiFi', '🍔 Food Plaza', '🛋️ Executive Lounge']
    }
  ]
};

/** Mumbai Rajdhani Express (12951) */
export const MOCK_RAJDHANI_JOURNEY: LiveJourney = {
  id: 'j-12951',
  trainId: '12951',
  train: MOCK_TRAINS[2],
  status: 'ON_TIME',
  delayMinutes: 2,
  location: { latitude: 23.8000, longitude: 74.2000 },
  speedKmph: 120,
  headingDegrees: 25,
  progress: { percentage: 55, distanceCoveredKm: 761, distanceRemainingKm: 623, totalDistanceKm: 1384 },
  updatedAt: new Date().toISOString(),
  currentStation: {
    id: 'st-brc', code: 'BRC', name: 'Vadodara Junction', latitude: 22.3072, longitude: 73.1812, sequence: 3,
    scheduledArrival: '20:38', actualArrival: '20:40', scheduledDeparture: '20:48', actualDeparture: '20:50',
    delayMinutes: 2, status: 'COMPLETED', elevationMeters: 36, platformNumber: 'PF 2', haltMinutes: 10,
    amenities: ['📶 Free WiFi', '🛋️ AC Lounge']
  },
  nextStation: {
    id: 'st-kota', code: 'KOTA', name: 'Kota Junction', latitude: 25.2138, longitude: 75.8648, sequence: 4,
    scheduledArrival: '03:15', actualArrival: '03:17', scheduledDeparture: '03:25', actualDeparture: '03:27',
    delayMinutes: 2, status: 'CURRENT', elevationMeters: 256, platformNumber: 'PF 1', haltMinutes: 10,
    amenities: ['📶 Free WiFi', '🍔 Food Court']
  },
  destination: {
    id: 'st-ndls', code: 'NDLS', name: 'New Delhi', latitude: 28.6139, longitude: 77.2090, sequence: 5,
    scheduledArrival: '08:32', actualArrival: '08:34', scheduledDeparture: '08:32', actualDeparture: '08:34',
    delayMinutes: 2, status: 'UPCOMING', elevationMeters: 216, platformNumber: 'PF 1', haltMinutes: 0,
    amenities: ['📶 Free WiFi', '🍔 Executive Lounge']
  },
  stations: [
    {
      id: 'st-mmct', code: 'MMCT', name: 'Mumbai Central', latitude: 18.9696, longitude: 72.8193, sequence: 1,
      scheduledArrival: '17:00', actualArrival: '17:00', scheduledDeparture: '17:00', actualDeparture: '17:00',
      delayMinutes: 0, status: 'COMPLETED', elevationMeters: 7, platformNumber: 'PF 1', haltMinutes: 0,
      amenities: ['📶 Free WiFi', '🍔 Executive Lounge']
    },
    {
      id: 'st-st', code: 'ST', name: 'Surat', latitude: 21.2036, longitude: 72.8398, sequence: 2,
      scheduledArrival: '19:43', actualArrival: '19:43', scheduledDeparture: '19:48', actualDeparture: '19:48',
      delayMinutes: 0, status: 'COMPLETED', elevationMeters: 14, platformNumber: 'PF 1', haltMinutes: 5,
      amenities: ['📶 Free WiFi']
    },
    {
      id: 'st-brc', code: 'BRC', name: 'Vadodara Junction', latitude: 22.3072, longitude: 73.1812, sequence: 3,
      scheduledArrival: '20:38', actualArrival: '20:40', scheduledDeparture: '20:48', actualDeparture: '20:50',
      delayMinutes: 2, status: 'COMPLETED', elevationMeters: 36, platformNumber: 'PF 2', haltMinutes: 10,
      amenities: ['📶 Free WiFi', '🛋️ AC Lounge']
    },
    {
      id: 'st-kota', code: 'KOTA', name: 'Kota Junction', latitude: 25.2138, longitude: 75.8648, sequence: 4,
      scheduledArrival: '03:15', actualArrival: '03:17', scheduledDeparture: '03:25', actualDeparture: '03:27',
      delayMinutes: 2, status: 'CURRENT', elevationMeters: 256, platformNumber: 'PF 1', haltMinutes: 10,
      amenities: ['📶 Free WiFi', '🍔 Food Court']
    },
    {
      id: 'st-ndls', code: 'NDLS', name: 'New Delhi', latitude: 28.6139, longitude: 77.2090, sequence: 5,
      scheduledArrival: '08:32', actualArrival: '08:34', scheduledDeparture: '08:32', actualDeparture: '08:34',
      delayMinutes: 2, status: 'UPCOMING', elevationMeters: 216, platformNumber: 'PF 1', haltMinutes: 0,
      amenities: ['📶 Free WiFi', '🍔 Executive Lounge']
    }
  ]
};

/** Kerala Superfast Express (12626) */
export const MOCK_KERALA_JOURNEY: LiveJourney = {
  id: 'j-12626',
  trainId: '12626',
  train: MOCK_TRAINS[1],
  status: 'DELAYED',
  delayMinutes: 25,
  location: { latitude: 21.1458, longitude: 79.0882 },
  speedKmph: 85,
  headingDegrees: 175,
  progress: { percentage: 40, distanceCoveredKm: 1212, distanceRemainingKm: 1819, totalDistanceKm: 3031 },
  updatedAt: new Date().toISOString(),
  currentStation: {
    id: 'st-bpl', code: 'BPL', name: 'Bhopal Junction', latitude: 23.2599, longitude: 77.4126, sequence: 3,
    scheduledArrival: '03:45', actualArrival: '04:10', scheduledDeparture: '03:55', actualDeparture: '04:20',
    delayMinutes: 25, status: 'COMPLETED', elevationMeters: 505, platformNumber: 'PF 1', haltMinutes: 10,
    amenities: ['📶 Free WiFi']
  },
  nextStation: {
    id: 'st-ngp', code: 'NGP', name: 'Nagpur Junction', latitude: 21.1458, longitude: 79.0882, sequence: 4,
    scheduledArrival: '09:50', actualArrival: '10:15', scheduledDeparture: '09:55', actualDeparture: '10:20',
    delayMinutes: 25, status: 'CURRENT', elevationMeters: 312, platformNumber: 'PF 1', haltMinutes: 5,
    amenities: ['📶 Free WiFi', '🍔 Food Plaza']
  },
  destination: {
    id: 'st-tvc', code: 'TVC', name: 'Trivandrum Central', latitude: 8.4875, longitude: 76.9525, sequence: 7,
    scheduledArrival: '18:00', actualArrival: '18:25', scheduledDeparture: '18:00', actualDeparture: '18:25',
    delayMinutes: 25, status: 'UPCOMING', elevationMeters: 9, platformNumber: 'PF 1', haltMinutes: 0,
    amenities: ['📶 Free WiFi', '🍔 Food Plaza']
  },
  stations: [
    {
      id: 'st-ndls', code: 'NDLS', name: 'New Delhi', latitude: 28.6139, longitude: 77.2090, sequence: 1,
      scheduledArrival: '20:10', actualArrival: '20:10', scheduledDeparture: '20:10', actualDeparture: '20:10',
      delayMinutes: 0, status: 'COMPLETED', elevationMeters: 216, platformNumber: 'PF 3', haltMinutes: 0,
      amenities: ['📶 Free WiFi', '🍔 Food Court']
    },
    {
      id: 'st-vglj', code: 'VGLJ', name: 'VGL Jhansi', latitude: 25.4484, longitude: 78.5685, sequence: 2,
      scheduledArrival: '01:30', actualArrival: '01:50', scheduledDeparture: '01:38', actualDeparture: '01:58',
      delayMinutes: 20, status: 'COMPLETED', elevationMeters: 214, platformNumber: 'PF 2', haltMinutes: 8,
      amenities: ['📶 Free WiFi']
    },
    {
      id: 'st-bpl', code: 'BPL', name: 'Bhopal Junction', latitude: 23.2599, longitude: 77.4126, sequence: 3,
      scheduledArrival: '03:45', actualArrival: '04:10', scheduledDeparture: '03:55', actualDeparture: '04:20',
      delayMinutes: 25, status: 'COMPLETED', elevationMeters: 505, platformNumber: 'PF 1', haltMinutes: 10,
      amenities: ['📶 Free WiFi']
    },
    {
      id: 'st-ngp', code: 'NGP', name: 'Nagpur Junction', latitude: 21.1458, longitude: 79.0882, sequence: 4,
      scheduledArrival: '09:50', actualArrival: '10:15', scheduledDeparture: '09:55', actualDeparture: '10:20',
      delayMinutes: 25, status: 'CURRENT', elevationMeters: 312, platformNumber: 'PF 1', haltMinutes: 5,
      amenities: ['📶 Free WiFi', '🍔 Food Plaza']
    },
    {
      id: 'st-bza', code: 'BZA', name: 'Vijayawada Junction', latitude: 16.5193, longitude: 80.6305, sequence: 5,
      scheduledArrival: '16:40', actualArrival: '17:05', scheduledDeparture: '16:55', actualDeparture: '17:20',
      delayMinutes: 25, status: 'UPCOMING', elevationMeters: 20, platformNumber: 'PF 4', haltMinutes: 15,
      amenities: ['📶 Free WiFi']
    },
    {
      id: 'st-ern', code: 'ERN', name: 'Ernakulam Town', latitude: 9.9816, longitude: 76.2999, sequence: 6,
      scheduledArrival: '14:15', actualArrival: '14:40', scheduledDeparture: '14:20', actualDeparture: '14:45',
      delayMinutes: 25, status: 'UPCOMING', elevationMeters: 4, platformNumber: 'PF 2', haltMinutes: 5,
      amenities: ['📶 Free WiFi']
    },
    {
      id: 'st-tvc', code: 'TVC', name: 'Trivandrum Central', latitude: 8.4875, longitude: 76.9525, sequence: 7,
      scheduledArrival: '18:00', actualArrival: '18:25', scheduledDeparture: '18:00', actualDeparture: '18:25',
      delayMinutes: 25, status: 'UPCOMING', elevationMeters: 9, platformNumber: 'PF 1', haltMinutes: 0,
      amenities: ['📶 Free WiFi', '🍔 Food Plaza']
    }
  ]
};

/** Bhopal Shatabdi Express (12002) */
export const MOCK_SHATABDI_JOURNEY: LiveJourney = {
  id: 'j-12002',
  trainId: '12002',
  train: MOCK_TRAINS[4],
  status: 'ON_TIME',
  delayMinutes: 0,
  location: { latitude: 27.1592, longitude: 78.0076 },
  speedKmph: 140,
  headingDegrees: 160,
  progress: { percentage: 32, distanceCoveredKm: 226, distanceRemainingKm: 482, totalDistanceKm: 708 },
  updatedAt: new Date().toISOString(),
  currentStation: {
    id: 'st-mtj', code: 'MTJ', name: 'Mathura Junction', latitude: 27.4924, longitude: 77.6737, sequence: 2,
    scheduledArrival: '07:19', actualArrival: '07:19', scheduledDeparture: '07:20', actualDeparture: '07:20',
    delayMinutes: 0, status: 'COMPLETED', elevationMeters: 177, platformNumber: 'PF 1', haltMinutes: 1,
    amenities: ['📶 Free WiFi']
  },
  nextStation: {
    id: 'st-agc', code: 'AGC', name: 'Agra Cantt', latitude: 27.1592, longitude: 78.0076, sequence: 3,
    scheduledArrival: '07:50', actualArrival: '07:50', scheduledDeparture: '07:55', actualDeparture: '07:55',
    delayMinutes: 0, status: 'CURRENT', elevationMeters: 169, platformNumber: 'PF 1', haltMinutes: 5,
    amenities: ['📶 Free WiFi', '🍔 Food Plaza']
  },
  destination: {
    id: 'st-rkmp', code: 'RKMP', name: 'Rani Kamlapati', latitude: 23.2330, longitude: 77.4350, sequence: 6,
    scheduledArrival: '14:40', actualArrival: '14:40', scheduledDeparture: '14:40', actualDeparture: '14:40',
    delayMinutes: 0, status: 'UPCOMING', elevationMeters: 505, platformNumber: 'PF 1', haltMinutes: 0,
    amenities: ['📶 Free WiFi', '🍔 World Class Lounge']
  },
  stations: [
    {
      id: 'st-ndls', code: 'NDLS', name: 'New Delhi', latitude: 28.6139, longitude: 77.2090, sequence: 1,
      scheduledArrival: '06:00', actualArrival: '06:00', scheduledDeparture: '06:00', actualDeparture: '06:00',
      delayMinutes: 0, status: 'COMPLETED', elevationMeters: 216, platformNumber: 'PF 1', haltMinutes: 0,
      amenities: ['📶 Free WiFi', '🍔 Executive Lounge']
    },
    {
      id: 'st-mtj', code: 'MTJ', name: 'Mathura Junction', latitude: 27.4924, longitude: 77.6737, sequence: 2,
      scheduledArrival: '07:19', actualArrival: '07:19', scheduledDeparture: '07:20', actualDeparture: '07:20',
      delayMinutes: 0, status: 'COMPLETED', elevationMeters: 177, platformNumber: 'PF 1', haltMinutes: 1,
      amenities: ['📶 Free WiFi']
    },
    {
      id: 'st-agc', code: 'AGC', name: 'Agra Cantt', latitude: 27.1592, longitude: 78.0076, sequence: 3,
      scheduledArrival: '07:50', actualArrival: '07:50', scheduledDeparture: '07:55', actualDeparture: '07:55',
      delayMinutes: 0, status: 'CURRENT', elevationMeters: 169, platformNumber: 'PF 1', haltMinutes: 5,
      amenities: ['📶 Free WiFi', '🍔 Food Plaza']
    },
    {
      id: 'st-gwl', code: 'GWL', name: 'Gwalior Junction', latitude: 26.2183, longitude: 78.1828, sequence: 4,
      scheduledArrival: '09:23', actualArrival: '09:23', scheduledDeparture: '09:28', actualDeparture: '09:28',
      delayMinutes: 0, status: 'UPCOMING', elevationMeters: 212, platformNumber: 'PF 1', haltMinutes: 5,
      amenities: ['📶 Free WiFi']
    },
    {
      id: 'st-vglj', code: 'VGLJ', name: 'VGL Jhansi', latitude: 25.4484, longitude: 78.5685, sequence: 5,
      scheduledArrival: '10:45', actualArrival: '10:45', scheduledDeparture: '10:50', actualDeparture: '10:50',
      delayMinutes: 0, status: 'UPCOMING', elevationMeters: 214, platformNumber: 'PF 1', haltMinutes: 5,
      amenities: ['📶 Free WiFi']
    },
    {
      id: 'st-rkmp', code: 'RKMP', name: 'Rani Kamlapati', latitude: 23.2330, longitude: 77.4350, sequence: 6,
      scheduledArrival: '14:40', actualArrival: '14:40', scheduledDeparture: '14:40', actualDeparture: '14:40',
      delayMinutes: 0, status: 'UPCOMING', elevationMeters: 505, platformNumber: 'PF 1', haltMinutes: 0,
      amenities: ['📶 Free WiFi', '🍔 World Class Lounge']
    }
  ]
};

/** Helper map for explicit train journeys */
export const MOCK_JOURNEY_MAP: Record<string, LiveJourney> = {
  '12727': MOCK_GODAVARI_JOURNEY,
  '22436': MOCK_VANDE_BHARAT_JOURNEY,
  '12951': MOCK_RAJDHANI_JOURNEY,
  '12626': MOCK_KERALA_JOURNEY,
  '12002': MOCK_SHATABDI_JOURNEY
};

/** Dynamic journey provider for any train ID */
export const getJourneyForTrain = (trainId: string, customTrains: Train[] = []): LiveJourney => {
  if (MOCK_JOURNEY_MAP[trainId]) {
    return {
      ...MOCK_JOURNEY_MAP[trainId],
      updatedAt: new Date().toISOString()
    };
  }

  // Find in default trains or custom trains
  const train =
    MOCK_TRAINS.find((t) => t.id === trainId || t.number === trainId) ||
    customTrains.find((t) => t.id === trainId || t.number === trainId) || {
      id: trainId,
      number: trainId,
      name: `Express ${trainId}`,
      source: 'Origin Station',
      destination: 'Terminal Station',
      totalDistanceKm: 600,
      trainType: 'Express',
      runsOn: ['Daily']
    };

  return {
    id: `j-${train.id}`,
    trainId: train.id,
    train,
    status: 'ON_TIME',
    delayMinutes: 0,
    location: { latitude: 18.5204, longitude: 73.8567 },
    speedKmph: 95,
    headingDegrees: 90,
    progress: {
      percentage: 50,
      distanceCoveredKm: Math.round(train.totalDistanceKm * 0.5),
      distanceRemainingKm: Math.round(train.totalDistanceKm * 0.5),
      totalDistanceKm: train.totalDistanceKm
    },
    updatedAt: new Date().toISOString(),
    currentStation: {
      id: `st-orig-${train.id}`,
      code: train.source.slice(0, 4).toUpperCase(),
      name: train.source,
      latitude: 18.5204,
      longitude: 73.8567,
      sequence: 1,
      scheduledArrival: '08:00',
      actualArrival: '08:00',
      scheduledDeparture: '08:15',
      actualDeparture: '08:15',
      delayMinutes: 0,
      status: 'COMPLETED',
      elevationMeters: 100,
      platformNumber: 'PF 1'
    },
    nextStation: {
      id: `st-mid-${train.id}`,
      code: 'MID',
      name: 'Midway Junction',
      latitude: 18.9000,
      longitude: 74.5000,
      sequence: 2,
      scheduledArrival: '11:30',
      actualArrival: '11:30',
      scheduledDeparture: '11:35',
      actualDeparture: '11:35',
      delayMinutes: 0,
      status: 'CURRENT',
      elevationMeters: 150,
      platformNumber: 'PF 2'
    },
    destination: {
      id: `st-dest-${train.id}`,
      code: train.destination.slice(0, 4).toUpperCase(),
      name: train.destination,
      latitude: 19.0760,
      longitude: 72.8777,
      sequence: 3,
      scheduledArrival: '16:00',
      actualArrival: '16:00',
      scheduledDeparture: '16:00',
      actualDeparture: '16:00',
      delayMinutes: 0,
      status: 'UPCOMING',
      elevationMeters: 10,
      platformNumber: 'PF 3'
    },
    stations: [
      {
        id: `st-orig-${train.id}`,
        code: train.source.slice(0, 4).toUpperCase(),
        name: train.source,
        latitude: 18.5204,
        longitude: 73.8567,
        sequence: 1,
        scheduledArrival: '08:00',
        actualArrival: '08:00',
        scheduledDeparture: '08:15',
        actualDeparture: '08:15',
        delayMinutes: 0,
        status: 'COMPLETED',
        elevationMeters: 100,
        platformNumber: 'PF 1',
        haltMinutes: 15,
        amenities: ['📶 WiFi', '🍔 Refreshments']
      },
      {
        id: `st-mid-${train.id}`,
        code: 'MID',
        name: 'Midway Junction',
        latitude: 18.9000,
        longitude: 74.5000,
        sequence: 2,
        scheduledArrival: '11:30',
        actualArrival: '11:30',
        scheduledDeparture: '11:35',
        actualDeparture: '11:35',
        delayMinutes: 0,
        status: 'CURRENT',
        elevationMeters: 150,
        platformNumber: 'PF 2',
        haltMinutes: 5,
        amenities: ['📶 WiFi', '☕ Snacks']
      },
      {
        id: `st-dest-${train.id}`,
        code: train.destination.slice(0, 4).toUpperCase(),
        name: train.destination,
        latitude: 19.0760,
        longitude: 72.8777,
        sequence: 3,
        scheduledArrival: '16:00',
        actualArrival: '16:00',
        scheduledDeparture: '16:00',
        actualDeparture: '16:00',
        delayMinutes: 0,
        status: 'UPCOMING',
        elevationMeters: 10,
        platformNumber: 'PF 3',
        haltMinutes: 0,
        amenities: ['📶 WiFi', '🍔 Food Plaza']
      }
    ]
  };
};

export const MOCK_WEATHER_DATA: Record<string, Weather> = {
  current: {
    locationName: 'Near Kazipet',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windKph: 14,
    rainProbability: 20,
    updatedAt: new Date().toISOString()
  },
  next: {
    locationName: 'Kazipet Junction',
    temperature: 27,
    condition: 'Clear Sky',
    humidity: 70,
    windKph: 12,
    rainProbability: 10,
    updatedAt: new Date().toISOString()
  },
  destination: {
    locationName: 'Visakhapatnam',
    temperature: 29,
    condition: 'Humid & Breezy',
    humidity: 82,
    windKph: 22,
    rainProbability: 40,
    updatedAt: new Date().toISOString()
  }
};

export const MOCK_ELEVATION_PROFILE: ElevationPoint[] = [
  { distanceKm: 0, elevationMeters: 505, stationName: 'HYB' },
  { distanceKm: 9, elevationMeters: 543, stationName: 'SC' },
  { distanceKm: 80, elevationMeters: 420 },
  { distanceKm: 141, elevationMeters: 268, stationName: 'KZJ' },
  { distanceKm: 250, elevationMeters: 120 },
  { distanceKm: 351, elevationMeters: 20, stationName: 'BZA' },
  { distanceKm: 411, elevationMeters: 13, stationName: 'EE' },
  { distanceKm: 501, elevationMeters: 14, stationName: 'RJY' },
  { distanceKm: 551, elevationMeters: 19, stationName: 'SLO' },
  { distanceKm: 668, elevationMeters: 31, stationName: 'AKP' },
  { distanceKm: 705, elevationMeters: 4, stationName: 'VSKP' }
];

export const MOCK_DELAY_HISTORY = [
  { stationCode: 'HYB', stationName: 'Hyderabad Deccan', scheduledTime: '17:00', actualTime: '17:00', delayMinutes: 0 },
  { stationCode: 'SC', stationName: 'Secunderabad Jn', scheduledTime: '17:30', actualTime: '17:42', delayMinutes: 12 },
  { stationCode: 'KZJ', stationName: 'Kazipet Jn', scheduledTime: '19:13', actualTime: '19:27', delayMinutes: 14 },
  { stationCode: 'BZA', stationName: 'Vijayawada Jn', scheduledTime: '23:30', actualTime: '23:44', delayMinutes: 14 },
  { stationCode: 'EE', stationName: 'Eluru', scheduledTime: '00:38', actualTime: '00:52', delayMinutes: 14 },
  { stationCode: 'RJY', stationName: 'Rajahmundry', scheduledTime: '01:53', actualTime: '02:05', delayMinutes: 12 },
  { stationCode: 'SLO', stationName: 'Samalkot Jn', scheduledTime: '02:38', actualTime: '02:46', delayMinutes: 8 },
  { stationCode: 'AKP', stationName: 'Anakapalle', scheduledTime: '04:28', actualTime: '04:33', delayMinutes: 5 },
  { stationCode: 'VSKP', stationName: 'Visakhapatnam Jn', scheduledTime: '05:45', actualTime: '05:48', delayMinutes: 3 }
];

export const MOCK_SPEED_PROFILE = [
  { distanceKm: 0, speedKmph: 0, sectionName: 'HYB Departure' },
  { distanceKm: 9, speedKmph: 45, sectionName: 'HYB-SC Junction' },
  { distanceKm: 40, speedKmph: 95, sectionName: 'SC Outskirts' },
  { distanceKm: 90, speedKmph: 110, sectionName: 'Ghatkesar-Bhongir Fast Track' },
  { distanceKm: 141, speedKmph: 25, sectionName: 'KZJ Approach' },
  { distanceKm: 200, speedKmph: 105, sectionName: 'Warangal Straight' },
  { distanceKm: 280, speedKmph: 115, sectionName: 'Khammam Express Corridor' },
  { distanceKm: 351, speedKmph: 15, sectionName: 'BZA Yard Approach' },
  { distanceKm: 411, speedKmph: 90, sectionName: 'Eluru Line' },
  { distanceKm: 501, speedKmph: 60, sectionName: 'Godavari River Bridge Crossing' },
  { distanceKm: 551, speedKmph: 100, sectionName: 'Samalkot Coastal Line' },
  { distanceKm: 668, speedKmph: 85, sectionName: 'Anakapalle Curve' },
  { distanceKm: 705, speedKmph: 0, sectionName: 'VSKP Terminal Arrival' }
];

export const MOCK_COACH_COMPOSITION = [
  { code: 'ENG', type: 'ENGINE', label: 'WAP-7 Loco' },
  { code: 'SLR1', type: 'LUGGAGE', label: 'Guard & Luggage' },
  { code: 'GS1', type: 'SLEEPER', label: 'General Unreserved' },
  { code: 'S1', type: 'SLEEPER', label: 'Sleeper Class' },
  { code: 'S2', type: 'SLEEPER', label: 'Sleeper Class' },
  { code: 'S3', type: 'SLEEPER', label: 'Sleeper Class' },
  { code: 'S4', type: 'SLEEPER', label: 'Sleeper Class' },
  { code: 'S5', type: 'SLEEPER', label: 'Sleeper Class' },
  { code: 'PC', type: 'PANTRY', label: 'Pantry Car' },
  { code: 'B1', type: 'AC_3_TIER', label: '3 AC Economy' },
  { code: 'B2', type: 'AC_3_TIER', label: '3 AC Economy' },
  { code: 'B3', type: 'AC_3_TIER', label: '3 AC Economy' },
  { code: 'A1', type: 'AC_2_TIER', label: '2 AC' },
  { code: 'A2', type: 'AC_2_TIER', label: '2 AC' },
  { code: 'H1', type: 'AC_FIRST', label: '1st AC Coupe' },
  { code: 'SLR2', type: 'LUGGAGE', label: 'EOG & Luggage' }
];

export const MOCK_GEOGRAPHIC_FEATURES: GeographicFeature[] = [
  {
    id: 'geo-1',
    name: 'Godavari River Rail Bridge',
    type: 'BRIDGE',
    latitude: 17.001,
    longitude: 81.765,
    distanceKmFromStart: 503,
    description: 'Third Godavari Bridge (Havelock Replacement), one of Asia’s longest rail-cum-road bridges.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'geo-2',
    name: 'Krishna River Basin',
    type: 'RIVER',
    latitude: 16.510,
    longitude: 80.620,
    distanceKmFromStart: 350,
    description: 'Major peninsular river crossed just before Vijayawada Junction.'
  },
  {
    id: 'geo-3',
    name: 'Eastern Ghats Foothills',
    type: 'GHAT',
    latitude: 17.650,
    longitude: 82.950,
    distanceKmFromStart: 640,
    description: 'Scenic hill ranges bordering the coastal railway alignment.'
  },
  {
    id: 'geo-4',
    name: 'Vijayawada Kanaka Durga Temple View',
    type: 'ATTRACTION',
    latitude: 16.518,
    longitude: 80.608,
    distanceKmFromStart: 352,
    description: 'Famous hilltop shrine overlooking the Krishna river railway bridge.'
  }
];

