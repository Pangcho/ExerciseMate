// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrv-EIlJdvZR9znYU3RfJmtFsySpNQWCY",
    authDomain: "pose2team.firebaseapp.com",
    projectId: "pose2team",
    storageBucket: "pose2team.appspot.com",
    messagingSenderId: "12023134207",
    appId: "1:12023134207:web:e3433aa59a26e54c3159ca",
    measurementId: "G-EQVVQ3YF2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//firebase storage
export const storage = getStorage(app)