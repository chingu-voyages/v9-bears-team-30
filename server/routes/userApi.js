const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/api/thoseguys", async (req, res) => {
  let users;
  const userdata = await User.find({}, (err, docs) => {
    if (err) return console.error(err);
    if (docs) {
      console.log("Found users")
    }
  })
  if (userdata) {
    users = userdata.map(user => {
      return { username: user.username, email: user.email };
    })
  }
  return res.json(users);
})

router.post("/api/new-user", function (req, res) {

  let newUser = new User({
    username: 'temp',
    email: req.body.emailAndPassword.signupEmail,
    password: req.body.emailAndPassword.signupPassword
  });

  newUser.save()
    .then(() => {
      res.send('success');
    })
    .catch(err => {
      res.status(400).send(err);
    });
});



module.exports = router
