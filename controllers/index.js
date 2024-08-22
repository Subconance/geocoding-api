const countryList = require("country-list");
const getGeoCode = require("../services");
const { default: axios } = require("axios");
require("dotenv").config();

const geoCode = async (req, res) => {
  const { address } = req.params;
  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  const cityName =
    address.charAt(0).toUpperCase() + address.slice(1).toLowerCase();

  try {
    const result = await getGeoCode(address);

    if (result.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    const location = result[0];
    const countryCode = location.address.country_code.toUpperCase();
    const countryName = countryList.getName(countryCode);

    return res.status(200).json({
      success: true,
      lat: location.lat,
      lon: location.lon,
      country: countryName,
      cityName,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while fetching geocode data",
    });
  }
};

const reverseGeoCode = async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat: lat,
          lon: lon,
          format: "json",
          addressdetails: 1,
        },
      }
    );

    const { name, display_name, address, boundingbox } = response.data;

    return res.json({
      success: true,
      lat,
      lon,
      name,
      display_name,
      address,
      boundingbox,
    });
  } catch (error) {
    console.error("Error fetching reverse geocode:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch reverse geocode data" });
  }
};

module.exports = { geoCode, reverseGeoCode };
