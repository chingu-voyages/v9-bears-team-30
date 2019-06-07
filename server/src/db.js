const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://chingu:bears-30@climatespy-34iab.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true})

const User = require("./models/user")

async function dbConnection() {
    const db = mongoose.connection
    db.on("error", console.error.bind(console, "connection error:"))
    db.once("open", () => {
        console.log("Connected, yo!")
    })
}


module.exports = dbConnection
