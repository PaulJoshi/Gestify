import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "gestify-sl-recognition.firebaseapp.com",
  projectId: "gestify-sl-recognition",
  storageBucket: "gestify-sl-recognition.appspot.com",
  messagingSenderId: "1058870205140",
  appId: "1:1058870205140:web:e4d0641c7953fc858d7941",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
