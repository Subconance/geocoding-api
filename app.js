const express = require("express");
require("dotenv").config();
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 11600;

app.get("/", (req, res) => {
  res.send("Geo Code API");
});

app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log("Geocode API started on port: " + PORT);
});
