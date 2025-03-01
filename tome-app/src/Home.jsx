import React from "react";
import ArtworksList from "./ArtworksList";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function Home() {

    // Configure Firebase.
    const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
    };
    firebase.initializeApp(config);

    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
    };

    return (
        <>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            <ArtworksList />
        </>
    )
}

export default Home;