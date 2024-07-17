const express = require("express");
const router = express.Router();
const Itinerary = require("../Models/Itinerary");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API}`);

router.post("/generate-itinerary", async (req, res) => {
  const {
    destination,
    source,
    departure_date,
    return_date,
    num_travelers,
    accommodation,
    preferences,
    userid
  } = req.body;
  const prompt = `
          Travel Itinerary Request:
  
          You are planning an extensive trip from ${source} to ${destination} for a group of ${num_travelers} travelers. Below are the detailed requirements for your itinerary:
  
          Trip Details:
          - Departure Date: ${departure_date}
          - Return Date: ${return_date}
          - Number of Travellers: ${num_travelers}
          - Accommodation Type: ${accommodation}
          - Preferences: ${preferences}
          
          Day-Wise Itinerary:
          Please provide a day-wise itinerary for your trip. Include activities, destinations, and any specific plans for each day of your journey. You can start with Day 1 and continue until your return date. Include approximate timings and descriptions of activities for each day.
  
          The more detailed information you provide, the more customized and tailored your travel itinerary will be. Feel free to add any other relevant details to ensure a memorable and stress-free trip.
      `;
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content using the model and prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let generatedItinerary = response.text().trim();
    generatedItinerary = generatedItinerary.replace(/\*/g, "");

    //storing itinerary in database
    await Itinerary.create({
        userId:userid,
      itinerary: generatedItinerary,
      destination,
      source,
      departureDate:departure_date,
      returnDate:return_date,
      numTravelers:num_travelers,
      accommodation,
      preferences,
    });

    res.json({ itinerary: generatedItinerary });

    setTimeout(() => {
      console.log("Timer expired. Ready for the next API request.");
    }, 150000);
  } catch (error) {
    console.error("Error generating itinerary:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the itinerary." });
  }
});

router.get("/getitinerary/:id", async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.params.id });
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
