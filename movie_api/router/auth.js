const express = require("express");
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt')
const router = express.Router();
const { User } = require("../models/user");


// APIs
// get all
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send("User not found...");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email & password");
  
  await user.save();

  res.send( true );
});


const validateUser = (auth) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(auth)
}

// module exports
module.exports = router;
