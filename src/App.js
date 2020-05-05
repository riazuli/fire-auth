import React, { useState } from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleLoginPopup = () => {
    firebase.auth().signInWithPopup(provider).then(result =>{
      const {displayName, email, photoURL} = result.user;
      const userData= {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      console.log(displayName, email);
      setUser(userData);
    }).catch( error => {
      console.log(error);
      console.log(error.message);
    });
  };
  const handleLogOut = () =>{
    firebase.auth().signOut().then( () =>{
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signedOutUser);
    })
    .catch(error =>{
      console.log(error);
    })
  }
  // firebase.auth().signInWithPopup(provider).then( result =>{
  //   console.log(result);
  // });
  return (
    <div className="App">
      {
        user.isSignedIn ? <button type="button" onClick={handleLogOut}>Sign Out</button> :
        <button type="button" onClick={handleLoginPopup}>Sign In</button>
      }
      {
        user.isSignedIn &&
        <div>
          <h4>Welcome, {user.name}</h4>
          <p>your email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
    </div>
  );
}

export default App;
