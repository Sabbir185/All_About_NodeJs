const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const app = express();

const genres = require("./router/genres");
const customers = require("./router/customers");
const movies = require("./router/movies");
const rentals = require("./router/rentals");
const users = require("./router/users");
const auth = require("./router/auth");

// database
mongoose
  .connect("mongodb://localhost/genre")
  .then(() => console.log("Connected to mongodb.."))
  .catch((err) => console.error(err));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan connected..");
}

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
