import React, { useState } from "react"

import Header from "../header/Header"
import SideDrawer from "../sidedrawer/SideDrawer"
import Backdrop from "../backdrop/Backdrop"

const Layout = (props) => {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
    const drawerToggleClickHandler = () => {
        if (sideDrawerOpen === false) {
            setSideDrawerOpen(true)
        } else {
            setSideDrawerOpen(false)
        }
    }

    const closeToggleClickHandler = () => {
        setSideDrawerOpen(false)
    }

    let sideDrawer;
    if (sideDrawerOpen) {
        sideDrawer = <SideDrawer closeClickHandler={closeToggleClickHandler} />
    }

    return (
       <div style={{height: `100%`}}>
            <Header drawerClickHandler={drawerToggleClickHandler} />
            {sideDrawer}
            {/* <Backdrop /> */}
            <div>{props.children}</div>
       </div> 
    )
}

export default Layout
