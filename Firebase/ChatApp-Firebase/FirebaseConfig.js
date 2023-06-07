// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIsXeh_5jfgubQGno5eaC_eMsyZtPOLkA",
  authDomain: "chat-firebase-6f4cf.firebaseapp.com",
  projectId: "chat-firebase-6f4cf",
  storageBucket: "chat-firebase-6f4cf.appspot.com",
  messagingSenderId: "39818994259",
  appId: "1:39818994259:web:e278c8b15fadb569139ca6",
  measurementId: "G-EYMBTL6WNX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);