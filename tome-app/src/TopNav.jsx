import React from "react";
import {Link, Route} from "react-router-dom";
import TomeSvg from './assets/Tome.svg';
import Button from './Button'


function TopNav () {
    return (
        <>
            <div className="flex flex-row justify-between border border-gray-300 items-center p-4 pl-6 pr-6 w-full m-0 absolute top-0 left-0 bg-white">
            <Link to="/"><img src={TomeSvg} alt="Tome Logo" className="sm" /></Link>
                <div className="flex flex-row gap-2">
                    <Link to="/new" ><Button variant="primary" size="small">Add</Button></Link>
                    <Button variant="secondary" size="small">Sign in</Button>
                </div>
            </div>
        </>
    )
}

export default TopNav;