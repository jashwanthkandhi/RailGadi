export interface FoodVendor {
  vendorName: string;
  specialty: string;
  contact?: string;
  distanceInMeters: number;
}

export interface Station {
  id: number;
  name: string;
  location: string;
  platforms: number;
  nearestFoodVendors: FoodVendor[];
}
