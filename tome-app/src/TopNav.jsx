import React from "react";
import {Link, Route} from "react-router-dom";
import TomeSvg from './assets/Tome.svg';


function TopNav () {
    return (
        <>
            <div>
            <Link to="/"><img src={TomeSvg} alt="Tome Logo" width="100" height="16" /></Link>
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