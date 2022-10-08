// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";



import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxrt7-nmshFTu54kaVIS1_PARn5cmq9L0",
  authDomain: "signalclone-29823.firebaseapp.com",
  projectId: "signalclone-29823",
  storageBucket: "signalclone-29823.appspot.com",
  messagingSenderId: "597761303164",
  appId: "1:597761303164:web:c73c76b860b29041a65ff9",
  measurementId: "G-EKZB5PV38N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);


export {app, auth, db}