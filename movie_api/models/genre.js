const mongoose = require("mongoose");
const Joi = require("joi");

// schema design
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

// input post validation using joi
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });

  return schema.validate(genre);
}


module.exports = {
    Genre,
    validateGenre
}