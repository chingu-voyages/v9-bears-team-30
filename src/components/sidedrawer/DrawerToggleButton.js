import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./sideDrawer.css"

const DrawerToggleButton = (props) => {
    return (
      <button className="toggle-button" onClick={props.click}>
        <FontAwesomeIcon
        className="hamburger-icon"
        icon={faBars}
        size="2x"
        transform="shrink-1"
        color="#fe0c0b"
        />
      </button>
    );
}

export default DrawerToggleButton