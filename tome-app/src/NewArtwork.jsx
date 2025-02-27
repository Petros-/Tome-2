import React, { useState, useEffect } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import db from './db';
import { useParams, useNavigate } from 'react-router-dom';
import Button from "./Button";

function NewArtwork({ existingData }) {
    // get id from url if editing
    const { id } = useParams();
    const navigate = useNavigate();

    //populate the form if editing an existing item
    useEffect(() => {
        if (existingData) {
            setTitle(existingData.title || '');
            setMedium(existingData.medium || '')
        }
    }, [existingData]);

    // const [artwork, setArtwork] = useState('');
    const [title, setTitle] = useState('');
    const [medium, setMedium] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (id) {
                await setDoc(doc(db, "artworks", id), {
                    title,
                    medium,
                    updtatedAt: new Date()
                }, { merge: true });
                console.log("Document updated:", id);

            } else {

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
            }

            // go back to the list after editing the form
            navigate("/");

        } catch (error) {
            console.error("There was a problem:", error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="absolute top-16 w-120 space-y-8">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="artwork-title">Title</label>
                            <input type="text" id="artwork-title" value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border border-gray-200 p-1"
                                data-form-type="other"
                            />
                        </div>
                    </div>
                    <label htmlFor="artwork-medium">Medium</label>
                    <input type="text" id="artwork-medium" value={medium}
                        onChange={(e) => setMedium(e.target.value)}
                        className="border border-gray-200 p-1"
                        data-form-type="other"
                    />
                    <Button type="submit">Save artwork</Button>
                </div>
            </form>
        </>
    )
}

export default NewArtwork;