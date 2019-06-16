import React from "react"

import Header from "../header/Header"

const Layout = (props) => {
    return (
       <div>
            <Header />
            <div>{props.children}</div>
       </div> 
    )
}

export default Layout
