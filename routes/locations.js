const express = require("express");
const router = express.Router();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

router.get("/locations", async (req, res) => {
  try {
    const { query } = req;
    console.log(query);

    const response = await axios.get(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/locations?q=${query.q}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    const { data } = response;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
