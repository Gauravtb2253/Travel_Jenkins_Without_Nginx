const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authroutes.js");
const itineraryRouter = require("./routes/itineraryroutes.js");
require("dotenv").config();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: `${process.env.BACKEND_URL}`,
  credentials: true,
  methods: "GET, POST, OPTIONS,PUT,DELETE",
  allowedHeaders: ["Content-Type", "X-Auth-Token", "Origin", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '/client/build')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch((err) => {
    console.error("FAILED TO CONNECT TO MONGODB");
    console.error(err);
  });

app.use("/api/", authRouter);
app.use("/api/", itineraryRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("server is starting on "+PORT);
});
