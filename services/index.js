const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getGeoCode = async (address) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(
      address
    )}&format=json`
  );

  return response.json();
};

module.exports = getGeoCode;
