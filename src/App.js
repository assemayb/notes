import "./App.css";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "./components/Auth";
import Notes from "./components/Notes";
import Todos from "./components/Todos";
import InputSection from './components/InputSections'

const firebaseConfig = {
  apiKey: "AIzaSyAekzbyEqn_W9q69gXotQpl6l-Vx1edGBo",
  authDomain: "notes-app-fd05a.firebaseapp.com",
  databaseURL: "https://notes-app-fd05a.firebaseio.com",
  projectId: "notes-app-fd05a",
  storageBucket: "notes-app-fd05a.appspot.com",
  messagingSenderId: "18684308796",
  appId: "1:18684308796:web:bb475027c5e4954c978239",
  measurementId: "G-68L4NMLC60",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  // TODO: change the name of the login comp to Auth;

  return (
    <div className="App">
      <Auth />
      <div className="App-header">
        <h2>Notes App</h2>
      </div>
      <div className="App-content">
        <Notes />
        <Todos />
      </div>
    </div>
  );
}

export default App;
