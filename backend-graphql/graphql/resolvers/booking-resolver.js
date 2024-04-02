const booking = require("../models/booking");

const addBooking = async (root, params) => {
  const bookingModel = new booking(params);
  const newBooking = await bookingModel.save();
  if (!newBooking) {
    throw new Error("Error");
  }
  return newBooking;
};

const getBookings = async () => {
  const bookings = await booking.find().exec();
  if (!bookings) {
    throw new Error("Error");
  }
  return bookings;
};

const getBookingById = async (root, params) => {
  const bookingFound = await booking.findById(params.id).exec();
  if (!bookingFound) {
    throw new Error("Error");
  }
  return bookingFound;
};

const updateBooking = async (root, params) => {
  const updatedBooking = await booking
    .findByIdAndUpdate(params.id, params)
    .exec();
  if (!updatedBooking) {
    throw new Error("Error");
  }
  return updatedBooking;
};

module.exports = {
  addBooking,
  getBookings,
  getBookingById,
  updateBooking,
};
