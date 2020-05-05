import React from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleLoginPopup = () => {
    firebase.auth().signInWithPopup(provider).then(result =>{
      const {displayName, email, photoURL} = result.user;
      console.log(displayName, email);
    });
  };
  // firebase.auth().signInWithPopup(provider).then( result =>{
  //   console.log(result);
  // });
  return (
    <div className="App">
      <button type="button" onClick={handleLoginPopup}>Sign In</button>
    </div>
  );
}

export default App;
