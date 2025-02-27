import React, {useEffect, useState} from "react";
import db from "./db.js";
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import { Link } from "react-router-dom";
import Button from "./Button.jsx";

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
        <div className="absolute top-16 grid grid-rows-4 gap-4 h-full items-center">
            {artworks.map(artwork => (
                <div key={artwork.id} className="flex flex-row gap-3 items-center border border-gray-300 p-4"><Link to={`/artwork/${artwork.id}`} >{artwork.title}</Link>
                    {artwork.medium} • 
                    {artwork.createdAt?.toDate().toLocaleString()}
                    <Link to={`/edit/${artwork.id}`}><Button variant="secondary" size="small">Edit</Button></Link>
                    <Button onClick={() => handleDelete(artwork.id)} variant="secondary" size="small">Delete</Button>
                 </div>
            ))}
        </div>
        </>
    )
}

export default ArtworksList;