const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri, {useNewUrlParser: true})

async function dbConnection() {
    const db = mongoose.connection
    db.on("error", console.error.bind(console, "connection error:"))
    db.once("open", () => {
        console.log("Database connected!")
    })
}

module.exports = dbConnection
