const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/api/thoseguys", async (req, res) => {
  let users;
  const userdata = await User.find({}, (err, docs) => {
    if (err) return console.error(err);
    if (docs) {
      console.log("Found users");
    }
  });
  if (userdata) {
    users = userdata.map(user => {
      return { username: user.username, email: user.email };
    });
  }
  return res.json(users);
})

module.exports = router
