import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8a2aVMA1Dcd0IefgerEZWu5LiAtnqe20",
  authDomain: "chat-631c2.firebaseapp.com",
  projectId: "chat-631c2",
  storageBucket: "chat-631c2.appspot.com",
  messagingSenderId: "841314748684",
  appId: "1:841314748684:web:66f470033e540dc5cde129"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();