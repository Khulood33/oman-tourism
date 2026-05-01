import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhiJlxxruZdx0z5jmtw1E6aSRTFT7hu8s",
  authDomain: "oman-tourism-new.firebaseapp.com",
  projectId: "oman-tourism-new",
  storageBucket: "oman-tourism-new.firebasestorage.app",
  messagingSenderId: "580317693824",
  appId: "1:580317693824:web:b8b88fff7048f955ca6365",
  measurementId: "G-N83D9GRMVC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
