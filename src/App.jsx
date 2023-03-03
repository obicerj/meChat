import { lazy, Suspense, useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import './App.css'
import { AuthContext } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  const SuspenseLoading = (
    <div className="h-screen w-screen flex justify-center items-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );

  const {currentUser} = useContext(AuthContext);

  return (
    <Suspense fallback={SuspenseLoading}>
    <div className="App">
      {currentUser ? (
        <Home />
      ) : (
        <Auth />
      )}
    </div>
    </Suspense>
  )
}

export default App
