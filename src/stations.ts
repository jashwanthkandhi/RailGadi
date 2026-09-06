import { Station } from "./station.model";

export const stations: Station[] = [
  {
    id: 1,
    name: "Secunderabad Junction",
    location: "Telangana",
    platforms: 10,
    nearestFoodVendors: [
      {
        vendorName: "Paradise Biryani",
        specialty: "Hyderabadi Biryani",
        contact: "9876543210",
        distanceInMeters: 150
      },
      {
        vendorName: "Chai Point",
        specialty: "Tea & Snacks",
        distanceInMeters: 80
      },
      {
        vendorName: "Swathi Tiffins",
        specialty: "Idli, Dosa, Vada",
        contact: "9123456780",
        distanceInMeters: 200
      }
    ]
  },
  {
    id: 2,
    name: "Kacheguda Station",
    location: "Telangana",
    platforms: 6,
    nearestFoodVendors: [
      {
        vendorName: "Ram Ki Bandi",
        specialty: "Paneer Butter Dosa",
        distanceInMeters: 120
      },
      {
        vendorName: "Karachi Bakery",
        specialty: "Biscuits & Cakes",
        contact: "9988776655",
        distanceInMeters: 250
      }
    ]
  }
];
