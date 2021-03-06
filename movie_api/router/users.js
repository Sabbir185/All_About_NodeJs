const express = require("express");
const _ = require('lodash');
const bcrypt = require('bcrypt')
const router = express.Router();
const { User, validateUser } = require("../models/user");


// APIs
// get all
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send("User already registered!");

  user = new User( _.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  
  await user.save();

  res.send( _.pick(user, ["_id", "name", "email"]));
});

// module exports
module.exports = router;
