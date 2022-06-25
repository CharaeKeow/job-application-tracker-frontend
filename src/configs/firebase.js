// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmbtR_tVgBJUsTGs6rY6z0q7FcpeGj3zc",
  authDomain: "job-application-tracker-62a03.firebaseapp.com",
  projectId: "job-application-tracker-62a03",
  storageBucket: "job-application-tracker-62a03.appspot.com",
  messagingSenderId: "465238284585",
  appId: "1:465238284585:web:e34a3d4d8e8135f1d3ff38",
  measurementId: "G-B5M4T0MYF2"
};


// Initialize Firebase
export const firebase = initializeApp(firebaseConfig)
export const auth = getAuth()