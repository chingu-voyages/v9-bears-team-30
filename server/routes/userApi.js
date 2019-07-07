const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

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
      return res.status(400).send({error: 'email already exists'});
    } else {
      //make the object to store
      let newUser = new User({
        username: 'temp',
        email: req.body.emailAndPassword.signupEmail,
        password: req.body.emailAndPassword.signupPassword
      });
      
      //hash password before saving
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //save the new object
          newUser.save((err, response) => {
            if (err) {
              return res.json({ success: false, error: err });
            }
            return res.send(response);
          });          
        });
      });
    }
  });
});

router.get("/api/signin", function (req, res) {
  //declare variables
  let email = req.query.email;
  let password = req.query.password;
  
  //search for email
  User.findOne({ email: email }).then(data => {
    //check if user exists
    if(!data) {
      return res.status(400).send({data});
    } 
    console.log('email matched: ' + data);

    //check password
    bcrypt.compare(password, data.password).then(isMatch => {
      if (isMatch) {
        //user matched

      console.log('password matched');
        //create JWT Payload
        const payload = {
          id: data.id,
          name: data.name,
          email: email
        }
        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
      } else {
        console.log('password no match');
        return res.status(400).send({data});
      }
    });
  });
});

//updates user's search History whenever a search is made
router.put("/api/update-search-history", function (req, res) {
  //declare variables
  console.log('updating search history');
  let history = req.body.searchCityAndState;
  let email = req.body.email;

  //finds and pushes new value to user's searchHistory
  User.findOneAndUpdate(
     { "email" : email },
     { $push: { "searchHistory" : history } },
     { returnNewDocument: true }
  ).then(function(data) {
    return res.send(data);
  });
});



module.exports = router
