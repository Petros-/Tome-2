import React from "react";
import {Link, Route} from "react-router-dom";
import Home from "./Home";

function TopNav () {
    return (
        <>
            <div>
                <Link to="/" >Tome</Link>
                <p>Sign in</p>
            </div>
        </>
    )
}

export default TopNav;