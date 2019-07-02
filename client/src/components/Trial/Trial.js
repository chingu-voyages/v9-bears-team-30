import React from "react"

const Trial = ({text}) => {
    return (
        <div>
            <h1 data-testid="heading-text">This is a Test</h1>
            <p data-testid="inject-text">{text}</p>
        </div>
    )
}

export default Trial

