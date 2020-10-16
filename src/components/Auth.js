import React from "react";
import { motion } from 'framer-motion'
import firebase from "firebase";
import { auth } from "../App";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Auth({ setUserDoesExist }) {
  const [user] = useAuthState(auth);
  const signInAndLogOutWithGoogle = () => {
    if (!user) {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(googleAuthProvider);
    } else {
      auth.signOut();
      setUserDoesExist(false)
    }
  };
  return (
    <>
      <motion.button className="login-button" onClick={signInAndLogOutWithGoogle}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.4
        }}
      >
        {user ? "Log Out" : "Log in with Google"}
      </motion.button>
    </>
  );
}
