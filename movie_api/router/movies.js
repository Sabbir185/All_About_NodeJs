const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Genre } = require("../models/genre");
const { Movie, validateMovie } = require("../models/movie");

// APIs
// get all
router.get("/", async (req, res) => {
  const movie = await Movie.find().sort("name");
  res.send(movie);
});

// new post
router.post("/", async (req, res) => {
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre');
    
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    await movie.save();

    res.send(movie)
});

// update
router.put("/:id", async (req, res) => {});

// delete
router.delete("/:id", async (req, res) => {});

// find One
router.get("/:id", async (req, res) => {});

// export module
module.exports = router;
