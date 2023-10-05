// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4BUs9BovtfD3w0Gq0_-aVyfb3kJNPj_k",
  authDomain: "react-firebase-authentic-e3379.firebaseapp.com",
  projectId: "react-firebase-authentic-e3379",
  storageBucket: "react-firebase-authentic-e3379.appspot.com",
  messagingSenderId: "453274996147",
  appId: "1:453274996147:web:a706fbdec1d65ba75f0fc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth ;