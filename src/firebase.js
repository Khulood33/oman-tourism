import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyhoM9bWvg6CSh4FOgTG_70h9vKzN4Px4",
  authDomain: "oman-tourism-1b780.firebaseapp.com",
  projectId: "oman-tourism-1b780",
  storageBucket: "oman-tourism-1b780.firebasestorage.app",
  messagingSenderId: "538925112614",
  appId: "1:538925112614:web:8cca56c60083f433afb5e7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);