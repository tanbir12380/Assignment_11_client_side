import React, { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocationS, setUserLocation] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const updateUsersDetails = (user11, name, photo) => {
    return updateProfile(user11, {
      displayName: name,
      photoURL: photo,
    });
  };

  const SignOutFromApp = () => {
     toast('logged out');
    return signOut(auth);
   
  };

    const resetYourPassword =(email)=>{
  return sendPasswordResetEmail(auth, email);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user1) => {
      if (user1) {
        setUser(user1);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    SignInUser,
    SignOutFromApp,
    loading,
    signInWithGoogle,
    updateUsersDetails,
    userLocationS,
    setUserLocation,
    resetYourPassword
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;