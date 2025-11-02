// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0f97tGu0i4rGooGpTlH3UQaQKuHRyCdA",
  authDomain: "ppwk-community-event-hub.firebaseapp.com",
  projectId: "ppwk-community-event-hub",
  storageBucket: "ppwk-community-event-hub.firebasestorage.app",
  messagingSenderId: "880036105881",
  appId: "1:880036105881:web:4df23c20c80b438c5c7208",
  measurementId: "G-1RE2RKXQYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // off for now

// Export services for use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);