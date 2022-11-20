import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FBID,
  authDomain: "basu-2b909.firebaseapp.com",
  projectId: "basu-2b909",
  storageBucket: "basu-2b909.appspot.com",
  messagingSenderId: "112773364065",
  appId: "1:112773364065:web:577ea8a0f5861fe2b7ed20",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
