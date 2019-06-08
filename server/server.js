const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const DB = require("./db")
const User = require("./src/models/user")

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/api/thoseguys", async (req, res) => {
    let users
    const userdata = await User.find({}, (err, docs) => {
        if (err) return console.error(err)
        if (docs) {
           console.log("callback")
        }
    })
    if (userdata) {
       users = userdata.map(user => {
           return { username: user.username, email: user.email }
       }) 
    }
    return res.json(users)
});

const port = process.env.PORT || 5000

DB()

app.listen(port, () => console.log(`Server running on port ${port}`))