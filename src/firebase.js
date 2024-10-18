// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVWP30n85yShMxjGW5dajyh0hYGtRuhzw",
  authDomain: "etdevs-collab.firebaseapp.com",
  projectId: "etdevs-collab",
  storageBucket: "etdevs-collab.appspot.com",
  messagingSenderId: "178660667741",
  appId: "1:178660667741:web:c1c7ff76e9ff520629f8b4",
  measurementId: "G-5RFBMDMXLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);