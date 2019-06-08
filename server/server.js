const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const DB = require("./db")

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/api/thoseguys", (req, res) => {
    const thoseguys = [
        { id: 1, firstName: "Peter", lastName: "Gibbons" },
        { id: 2, firstName: "Michael", lastName: "Bolton" },
        { id: 3, firstName: "William", lastName: "Lumbergh" },
    ];

    res.json(thoseguys)
});

const port = process.env.PORT || 5000

DB()

app.listen(port, () => console.log(`Server running on port ${port}`))