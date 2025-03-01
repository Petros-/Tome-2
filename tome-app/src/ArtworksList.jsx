import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import db from "./db.js";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


function ArtworksList() {
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [user, setUser] = useState({});

    // Configure Firebase.
    const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
    };
    firebase.initializeApp(config);

    useEffect(() => {
        const unregisteredAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            console.log(user.uid)
            setUser(user)
        })
        return () => unregisteredAuthObserver
    }, [user.uid])

    console.log(user.uid);

    useEffect(() => {

        if (!user.uid) {
            return
        }

        const fetchArt = async () => {
            try {
                
                const q = query(collection(db, "users", user.uid, "artworks"), orderBy("createdAt"));

                onSnapshot(q, (doc) => {
                    console.log("Current data:",);
                    setArtworks(doc.docs);
                })
            } catch (error) {
                console.log("An error happened:", error);
                setHasError(true)
            } finally {
                setIsLoading(false);
            }
        };
        fetchArt();
        return () => onSnapshot;

    }, [user.uid]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'artworks', id));
            // setArtworks(prevArtworks => prevArtworks.filter(artwork => artwork.id !== id));

        } catch (error) {
            console.error("Error with the delete:", error)
        }

    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (hasError) {
        return <h2>There was an error. Peter wrote this</h2>
    }

    return (
        <>
            <div className="absolute top-16 grid grid-rows-4 gap-4 h-full items-center">
                {artworks.map((artwork) => {
                    <div key={artwork.id} className="flex flex-row gap-3 items-center border border-gray-300 p-4"><Link to={`/artwork/${artwork.id}`} >{artwork.title}</Link>
                        {artwork.data().title} •
                        {artwork.data().createdAt?.toDate().toLocaleString()}
                        <Link to={`/edit/${artwork.id}`}><Button variant="secondary" size="small">Edit</Button></Link>
                        <Button onClick={() => handleDelete(artwork.id)} variant="secondary" size="small">Delete</Button>
                    </div>
                })}
            </div>
        </>
    )
}

export default ArtworksList;