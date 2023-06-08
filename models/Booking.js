const mongoose = require("mongoose");

const Booking = mongoose.model("Booking", {
  title: String,
  firstName: String,
  lastName: String,
  company: String,
  email: String,
  street: String,
  postalCode: String,
  city: String,
  country: String,
  phoneCode: String,
  phoneNumber: String,
  birthdate: String,
  startDate: String,
  endDate: String,
  carId: String,
  bookingId: String,
  rentalDuration: Number,
  totalAmount: String,
  carType: String,
  cart: { type: Array, default: [] },
  imageURL: String,
  prices: { type: Object, default: {} },
  extraFees: { type: Array, default: [] },
  includedCharges: { type: Array, default: [] },
});

module.exports = Booking;
