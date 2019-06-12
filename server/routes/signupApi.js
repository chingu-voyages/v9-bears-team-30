const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/api/new-user", async (req, res) => {
  let newUser = new User({
    email: req.body.emailAndPassword.signupEmail,
    password: req.body.emailAndPassword.signupPassword
  });

  newUser.save()
  .then(item => {
    res.send('success');
  })
  .catch(err => {
    res.status(400).send(err);
  });
});

module.exports = router;
