import React from "react"

import Header from "./Header"
import ThoseGuys from "./ThoseGuys"
import "./app.css"

const App = () => {
    return (
        <div>
            <Header />
            <h1 id="info">Basic React App!</h1>
            <ThoseGuys />
        </div>
    )
}

export default App