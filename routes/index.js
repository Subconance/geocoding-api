const express = require("express");
const { geoCode, reverseGeoCode } = require("../controllers");

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Geocode API",
  });
});

router.get("/geocode/:address", geoCode);
router.get("/reverse", reverseGeoCode);

module.exports = router;
