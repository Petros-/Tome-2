import React, {useState} from "react";
import {collection, addDoc} from "firebase/firestore";
import db from './db'

function NewArtwork () {
    // const [artwork, setArtwork] = useState('');
    const [title, setTitle] = useState('');
    const [medium, setMedium] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            // Add a new document with a generated id
            const docRef = await addDoc(collection(db, "artworks"), {
                title: title,
                medium: medium,
                createdAt: new Date()
            });

            console.log("Doc written, id:", docRef.id);

            // clear the fields
            setTitle('')
            setMedium('')

        } catch (error) {
            console.error("There was a problem:", error);
        }
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="artwork-title">Title</label>
                    <input type="text" id="artwork-title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="artwork-medium">Medium</label>
                    <input type="text" id="artwork-medium" value={medium} onChange={(e) => setMedium(e.target.value)}/>
                    <button type="submit">Save artwork</button>
                </form>
            </div>
        </>
    )
}

export default NewArtwork;