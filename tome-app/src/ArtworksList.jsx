import React, {useEffect, useState} from "react";
import db from "./db.js";
import {collection, getDocs} from "firebase/firestore";
import { Link } from "react-router-dom";

function ArtworksList () {
    const [artworks, setArtworks] = useState([]);
    useEffect(() => {
        const fetchArt = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "artworks"));
                const items = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setArtworks(items);
            } catch (error) {
                console.log("An error happened:", error)
            }
        };
        fetchArt();
    }, [db]);

    
    return (
        <>
            {artworks.map(artwork => (
                <div key={artwork.id}><Link to={`/artwork/${artwork.id}`} >{artwork.title}</Link>
                    {artwork.createdAt?.toDate().toLocaleString()}
                    {artwork.medium}
                    <Link to={`/edit/${artwork.id}`}><button>Edit</button></Link>
                 </div>
            ))}
        </>
    )
}

export default ArtworksList;