import React from 'react';
import './home.css';
import firebase from 'firebase/app';
export default function Home(props) {
  return (
    <div className="container">
      <div className="home-page">
        <div className="blue-box"></div>
        <div className="green-box"></div>
        <h1>Bark at the Park</h1>
        <p>A place for your furry friend to make their own furry friend.</p>
        <div className="sign-in-button">
          <input
            id="google-paw"
            type="image"
            src="./icons/google-paw.PNG"
          ></input>

          <button
            className="google-sign-in"
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(googleAuthProvider);
            }}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
