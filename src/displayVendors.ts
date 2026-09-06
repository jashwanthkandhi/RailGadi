import { stations } from "./stations";

stations.forEach(station => {
  console.log(`\nStation: ${station.name} (${station.location})`);
  console.log("Nearest Food Vendors:");
  station.nearestFoodVendors.forEach(vendor => {
    console.log(`- ${vendor.vendorName} | ${vendor.specialty} | ${vendor.distanceInMeters}m`);
  });
});
