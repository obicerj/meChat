import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";

function App() {
  const SuspenseLoading = (
    <div className="h-screen w-screen flex justify-center items-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );

  return (
    <Suspense fallback={SuspenseLoading}>
    <div className="App">
      <Home />
    </div>
    </Suspense>
  )
}

export default App
