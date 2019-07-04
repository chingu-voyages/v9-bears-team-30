const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const DB = require("./server/db")
const passport = require("passport");
const userRouter = require("./server/routes/userApi")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./server/config/passport")(passport);

app.use("/user", userRouter)

// Serve static assets if in production mode
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"))
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const port = process.env.PORT || 5000

DB()

app.listen(port, () => console.log(`Server running on port ${port}`))

