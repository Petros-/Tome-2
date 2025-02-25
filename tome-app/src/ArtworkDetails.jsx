import React, {useState, useEffect} from "react";
import { collection, getDocs, doc, getDoc, onSnapshot} from "firebase/firestore";
import { useParams} from 'react-router-dom';
import db from './db';

function ArtworkDetails () {
    const {id} = useParams();
    const [artwork, setArtwork] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    //show details
    useEffect(() => {
        const getData = async () => {
            try {
                const docRef = doc(db, "artworks", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists) {
                    setArtwork(docSnap.data())
                } else {
                    setHasError(true);
                }

            } catch (error) {
                console.error("Error fetching document:", error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, [id])



    return (
        <>
        <div>
            <h1>{artwork.title}</h1>
            <p>Something else</p>
        </div>
            
        </>
    )
}

export default ArtworkDetails;