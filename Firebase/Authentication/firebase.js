//import this from firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBQ_pSJiN0nPcbyQqvnIBOXqt29vIZSpD0",
  authDomain: "react-authorization-7b446.firebaseapp.com",
  projectId: "react-authorization-7b446",
  storageBucket: "react-authorization-7b446.appspot.com",
  messagingSenderId: "138604550160",
  appId: "1:138604550160:web:dfa7a638f0c33f5668d295",
  measurementId: "G-B1V6LEN4GF"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export default app
