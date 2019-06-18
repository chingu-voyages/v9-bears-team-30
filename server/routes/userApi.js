const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/api/thoseguys", async (req, res) => {
  let users;
  const userdata = await User.find({}, (err, docs) => {
    if (err) return console.error(err);
    if (docs) {
      //console.log("Found users")
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
  let findExistingUser = User.findOne(
    { email: req.body.emailAndPassword.signupEmail }
  ).then(function(data) {
    //return an error is username is already in collection
    if (data) {
      return res.status(400).send({error: 'username already exists'});
    } else {
      //make the object to store
      let newUser = new User({
        username: 'temp',
        email: req.body.emailAndPassword.signupEmail,
        password: req.body.emailAndPassword.signupPassword
      });
      
      //save the new object
      newUser.save((err, response) => {
        if (err) {
          return res.json({ success: false, error: err });
        }
        return res.send(response);
      });
    }
  });
});

router.get("/api/signin", function (req, res) {
  // console.log(req.query);
  let findExistingUser = User.findOne(
    { 
      email: req.query.email,
      password: req.query.password
    }
  ).then(function (data) {
        if(!data) {
          // console.log('got an error: ' + data);
          return res.status(400).send({data});
        } else {
          // console.log('got some data: ' + JSON.stringify(data));
          return res.send(data);
        }
      });
});



module.exports = router
