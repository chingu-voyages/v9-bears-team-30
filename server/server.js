const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const DB = require("./db")
const userRouter = require("./src/routes/userApi")

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/user", userRouter)

const port = process.env.PORT || 5000

DB()

app.listen(port, () => console.log(`Server running on port ${port}`))