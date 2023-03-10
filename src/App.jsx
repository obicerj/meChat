import { doc, onSnapshot, snapshotEqual, updateDoc } from "firebase/firestore";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import './App.css'
import { AuthContext } from "./context/AuthContext";
import { getUserState, login } from "./features/auth/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  const [authUser] = useAuthState(auth);

  const { user: currentUser } = useSelector(getUserState);

  const dispatch = useDispatch();


  useEffect(() => {
    if(!authUser) return;

    const userDocRef = doc(db, "users", authUser.uid);

    updateDoc(userDocRef, {
      status: "online",
    });

    const unsub = onSnapshot(userDocRef, async (snapshot) => {
      if (!snapshot.exists()) return;

      dispatch(login(snapshot.data()));
    });

    return () => {
      updateDoc(userDocRef, {
        status: "offline",
      });
      unsub();
    };
  }, [authUser]);

  const SuspenseLoading = (
    <div className="h-screen w-screen flex justify-center items-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
  

  // console.log("c",currentUser.uid)

  // const {currentUser} = useContext(AuthContext);

  return (
    <Suspense fallback={SuspenseLoading}>
    <div className="App">
      {currentUser.uid ? (
        <Home />
      ) : (
        <Auth />
      )}
    </div>
    </Suspense>
  )
}

export default App
