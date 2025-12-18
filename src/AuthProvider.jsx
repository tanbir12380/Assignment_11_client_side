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
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

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
    Swal.fire({
      icon: "success",
      allowOutsideClick: false,
      title: "Your are logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    return signOut(auth);
  };

  const resetYourPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user1) => {
      if (user1) {
        setUser(user1);
        setTimeout(() => {
          setLoading(false);
        }, 0);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const {
    data: dbUser,
    isLoading,
    isFetching,
    refetch: refetchRole,
  } = useQuery({
    queryKey: ["dbUser", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-11-server-phi-teal.vercel.app/user/${user.email}`,
        {
          headers: {
            accesstoken: user.accessToken,
          },
        }
      );
      return res.json();
    },
    enabled: !!user?.email,
  });

  const authInfo = {
    user,
    createUser,
    SignInUser,
    SignOutFromApp,
    userRole: dbUser?.role,
    refetchRole,
    loading,
    isLoading,
    isFetching,
    signInWithGoogle,
    updateUsersDetails,
    userLocationS,
    setUserLocation,
    resetYourPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
