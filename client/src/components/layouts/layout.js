import React, { useState } from "react"

import Header from "../header/Header"
import SideDrawer from "../sidedrawer/SideDrawer"

const Layout = (props) => {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
    const drawerToggleClickHandler = () => {
        if (sideDrawerOpen === false) {
            setSideDrawerOpen(true)
        } else {
            setSideDrawerOpen(false)
        }
    }

    const drawerCloseClickHandler = () => {
       setSideDrawerOpen(false)
    }

    let sideDrawer;
    if (sideDrawerOpen) {
        sideDrawer = <SideDrawer drawer={"side-drawer"} click={drawerCloseClickHandler} />
    }

    return (
       <div style={{height: `100%`}}>
            <Header drawerClickHandler={drawerToggleClickHandler} />
            {sideDrawer}
            <div>{props.children}</div>
       </div> 
    )
}

export default Layout

