import React, { useState } from "react";
import firebase from "firebase";
import { auth } from "../App";
import { useAuthState } from "react-firebase-hooks/auth";

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
      <button className="login-button" onClick={signInAndLogOutWithGoogle}>
        {user ? "Log Out" : "Log in with Google"}
      </button>
    </>
  );
}
