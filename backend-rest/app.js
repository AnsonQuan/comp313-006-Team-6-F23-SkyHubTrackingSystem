import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLEAI_APIKEY);

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

app.listen(PORT, () =>
  console.log(`Server is running on port: http://localhost:${PORT}`)
);

if (!process.env.AMADEUS_APIKEY || !process.env.AMADEUS_APISECRET) {
  console.error("Error: Please provide values for AMADEUS_APIKEY and AMADEUS_APISECRET in your .env file.");
  process.exit(1); // Exit the application
}


//Flight Search API
import Amadeus from "amadeus";
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_APIKEY,
  clientSecret: process.env.AMADEUS_APISECRET,
});
app.get(`/city-and-airport-search/:parameter`, (req, res) => {
  const parameter = req.params.parameter;
  // Which cities or airports start with the parameter variable
  amadeus.referenceData.locations
    .get({
      keyword: parameter,
      subType: Amadeus.location.any,
    })
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
});

app.get(`/flight-search`, (req, res) => {
  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture;
  // Find the cheapest flights
  amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: originCode,
      destinationLocationCode: destinationCode,
      departureDate: dateOfDeparture,
      adults: "1",
      max: "7",
    })
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
});

app.get(`/flight-deal-by-origin/:parameter`, (req, res) => {
  const parameter = req.params.parameter;
  // Find the cheapest flights from a specific origin
  amadeus.shopping.flightDestinations
    .get({
      origin: parameter,
    })
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
});

app.post(`/flight-confirmation`, (req, res) => {
  const flight = req.body.flight;
  // Confirm availability and price
  amadeus.shopping.flightOffers.pricing
    .post(
      JSON.stringify({
        data: {
          type: "flight-offers-pricing",
          flightOffers: [flight],
        },
      })
    )
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
});

//GenAI API
const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 200,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
});

const geminiChat = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("prompt=", prompt);

    const result = await model.generateContentStream(prompt);

    let text = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      text += chunkText;
    }

    res.status(200).json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

app.post("/gemini", geminiChat);
