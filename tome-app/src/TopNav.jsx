import React from "react";
import {Link, Route} from "react-router-dom";


function TopNav () {
    return (
        <>
            <div>
                <Link to="/" >Tome</Link>
                <ul>
                    <li>
                        <Link to="/new" >Add</Link>
                    </li>
                    <li>
                        <p>Sign in</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default TopNav;