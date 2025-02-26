import React, {useEffect, useState} from "react";
import db from "./db.js";
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";
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

    const handleDelete = async(id) => {
        try {  
            await deleteDoc(doc(db, 'artworks', id));
            setArtworks(prevArtworks => prevArtworks.filter(artwork => artwork.id !== id));

        } catch (error) {
            console.error("Error with the delete:", error)
        }

    }

    
    return (
        <>
            {artworks.map(artwork => (
                <div key={artwork.id}><Link to={`/artwork/${artwork.id}`} >{artwork.title}</Link>
                    {artwork.createdAt?.toDate().toLocaleString()}
                    {artwork.medium}
                    <Link to={`/edit/${artwork.id}`}><button>Edit</button></Link>
                    <button onClick={() => handleDelete(artwork.id)}>Delete</button>
                 </div>
            ))}
        </>
    )
}

export default ArtworksList;