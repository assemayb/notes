import React, { useState } from "react";
import firebase from "firebase";
import { auth } from "../App";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from 'framer-motion'

export default function Auth() {
  const [user] = useAuthState(auth);
  const signInAndLogOutWithGoogle = () => {
    if (!user) {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(googleAuthProvider);
    }
    auth.signOut();
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
