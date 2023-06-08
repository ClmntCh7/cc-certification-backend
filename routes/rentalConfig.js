const express = require("express");
const router = express.Router();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const Booking = require("../models/Booking");

const API_KEY = process.env.API_KEY;

router.post("/rentalconfigurations/create", async (req, res) => {
  try {
    const { body } = req;

    const response = await axios.post(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentalconfigurations/create`,
      body,
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

router.get("/bookings", async (req, res) => {
  try {
    const response = await Booking.find();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// CREATE BOOKING

router.post("/rentalconfigurations/book", async (req, res) => {
  try {
    const { body } = req;
    const {
      title,
      firstName,
      lastName,
      company,
      email,
      street,
      postalCode,
      city,
      country,
      phoneCode,
      phoneNumber,
    } = req.body.userInfo;

    const {
      startDate,
      endDate,
      carId,
      rentalDuration,
      totalAmount,
      selectedElem,
      cart,
      extraFees,
      includedCharges,
    } = req.body;

    const { headlines, images, prices } = selectedElem;

    console.log(prices);

    const newBooking = new Booking({
      title: title,
      firstName: firstName,
      lastName: lastName,
      company: company,
      email: email,
      street: street,
      postalCode: postalCode,
      city: city,
      country: country,
      phoneCode: phoneCode,
      phoneNumber: phoneNumber,
      birthdate: body.birthdate,
      startDate: startDate,
      endDate: endDate,
      carId: carId,
      rentalDuration: rentalDuration,
      totalAmount: `${totalAmount} €`,
      carType: headlines.longSubline,
      cart: cart,
      imageURL: images.small,
      prices: prices,
      extraFees: extraFees,
      includedCharges: includedCharges,
    });

    await newBooking.save();

    const record = await Booking.find();
    const index = record.length - 1;
    let newIndex;
    if (index < 10) {
      newIndex = "00" + index;
    } else {
      newIndex = "0" + index;
    }

    const nameLetter = lastName.substring(0, 3).toUpperCase();
    const yyStartDate = startDate.substring(2, 4);
    const mmStartDate = startDate.substring(5, 7);
    const bookingId = nameLetter + yyStartDate + mmStartDate + newIndex;

    await Booking.findOneAndUpdate(
      { _id: newBooking._id },
      { bookingId: bookingId }
    );

    res.status(200).json({ bookingId: bookingId, newBooking: newBooking });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// DELETE BOOKING

router.post("/rentalconfigurations/delete", async (req, res) => {
  try {
    console.log("body", req.body);
    const { body } = req;
    const { ids } = body;

    const filter = { _id: { $in: ids } };
    console.log(filter);
    const response = await Booking.deleteMany(filter);

    return res.status(200).json({ response: response });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
