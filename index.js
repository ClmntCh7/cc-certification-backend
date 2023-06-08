const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(express.json());

const locationsRoutes = require("./routes/locations");
app.use(locationsRoutes);
const offersRoutes = require("./routes/offers");
app.use(offersRoutes);
const configRoutes = require("./routes/rentalConfig");
app.use(configRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hey !" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
