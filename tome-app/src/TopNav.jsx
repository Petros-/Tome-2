import React, { useState, useEffect } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import TomeSvg from './assets/Tome.svg';
import Button from './Button'
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';


function TopNav() {
    // const [user, setUser] = useState(null);
    // const navigate = useNavigate();
    // // Repeated block of code for auth stuff here
    // const config = {
    //     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    //     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    //     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
    // };
    // firebase.initializeApp(config);

    // useEffect(() => {
    //     const unregisteredAuthObserver = firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             console.log("Yo", user.uid)
    //             setUser(user)
    //         } else {
    //             setUser(null);
    //         }
    //     })
    //     return () => unregisteredAuthObserver();
    // }, [])


    return (

        <div className="flex flex-row justify-between border border-gray-300 items-center p-4 pl-6 pr-6 w-full m-0 absolute top-0 left-0 bg-white">
            <Link to="/"><img src={TomeSvg} alt="Tome Logo" className="sm" /></Link>
            <div className="flex flex-row gap-2">
                
                <Link to="/new" ><Button variant="primary" size="small">Add</Button></Link>
                <Button variant="secondary" size="small">Sign in</Button>
            </div>
        </div>

    )
}

export default TopNav;