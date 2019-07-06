import React from "react"

import "./sideDrawer.css"

const DrawerToggleButton = (props) => {
    return (
      <button className="toggle-button" onClick={props.click}>
        &#8801;
      </button>
    );
}

export default DrawerToggleButton

