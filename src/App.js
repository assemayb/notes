import "./App.css";
import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { motion } from "framer-motion";
import Auth from "./components/Auth";
import Notes from "./components/Notes";
import Todos from "./components/Todos";

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
  const [userDoesExist, setUserDoesExist] = useState(false);
  const [userName, setUserName] = useState("");

  const notesDatabaseRef = firestore.collection("notes");
  let query = notesDatabaseRef.where("userName", "==", userName);
  const [data] = useCollectionData(query, { idField: "id" });

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const changeUserState = () => {
      if (user) {
        setUserDoesExist(true);
        setUserName(user.displayName.split(" ")[0]);
      }
    };
    changeUserState();
  }, [user]);

  useEffect(() => {
    setAllData(data);
  }, [data]);

  return (
    <div className="App">
      <Auth setUserDoesExist={setUserDoesExist} />
      <motion.div
        className="App-header"
        initial={{ y: -400 }}
        animate={{
          y: 0,
          fontSize: "20px",
        }}
        transition={{ type: "tween", stiffness: 100, duration: 0.7 }}
      >
        <h3>Notes App</h3>
      </motion.div>
      {allData ? (
        <div className="App-content">
          <Notes
            userDoesExist={userDoesExist}
            allData={allData}
            userName={userName}
          />
          <Todos
            userDoesExist={userDoesExist}
            allData={allData}
            userName={userName}
          />
        </div>
      ) : (
        <div className="loading-section">
          <h4>loading......</h4>
        </div>
      )}
    </div>
  );
}

export default App;
