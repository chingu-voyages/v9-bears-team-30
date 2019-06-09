import React from "react"

import Header from "./Header"
import ThoseGuys from "./ThoseGuys"
import "./app.css"

const App = () => {
    return (
        <div>
            <Header />
            <h1 id="info">Bears Team 30 App!</h1>
            <ThoseGuys />
        </div>
    )
}

export default App