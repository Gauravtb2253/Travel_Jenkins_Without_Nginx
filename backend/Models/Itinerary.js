const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    numTravelers: {
      type: Number,
      required: true,
    },
    accommodation: {
      type: String,
      required: true,
    },
    preferences: {
      type: String,
    },
    itinerary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
