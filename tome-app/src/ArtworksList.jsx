import React, { useEffect, useState } from "react";
import db from "./db.js";
import { collection, getDocs, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";


function ArtworksList() {
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);


    

    useEffect(() => {
        const fetchArt = async () => {
            try {
                // commenting this out so I can get the user's collection
                // const querySnapshot = await getDocs(collection(db, "artworks"));
                // const items = querySnapshot.docs.map(doc => ({
                //     id: doc.id,
                //     ...doc.data()
                // }));
                // setArtworks(items);

                const userId = "xCUZ9GKaFmjApOlaTpH7";

                const q = query(collection(db, "users", userId, "artworks"), orderBy("createdAt"));

                onSnapshot(q, (doc) => {
                    console.log("Current data:",);
                    setArtworks(doc.docs);
                })
            } catch (error) {
                setHasError(true)
                console.log("An error happened:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArt();
    }, [db]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'artworks', id));
            setArtworks(prevArtworks => prevArtworks.filter(artwork => artwork.id !== id));

        } catch (error) {
            console.error("Error with the delete:", error)
        }

    }


    return (
        <>
            <div className="absolute top-16 grid grid-rows-4 gap-4 h-full items-center">
                {artworks.map(artwork => (
                    <div key={artwork.id} className="flex flex-row gap-3 items-center border border-gray-300 p-4"><Link to={`/artwork/${artwork.id}`} >{artwork.title}</Link>
                        {artwork.data().title} •
                        {artwork.data().createdAt?.toDate().toLocaleString()}
                        <Link to={`/edit/${artwork.id}`}><Button variant="secondary" size="small">Edit</Button></Link>
                        <Button onClick={() => handleDelete(artwork.id)} variant="secondary" size="small">Delete</Button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ArtworksList;