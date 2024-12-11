// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: "smart-reminder-aa0b8.firebaseapp.com",
    databaseURL:
        "https://smart-reminder-aa0b8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-reminder-aa0b8",
    storageBucket: "smart-reminder-aa0b8.firebasestorage.app",
    messagingSenderId: "690146084117",
    appId: "1:690146084117:web:d16a8a7440ae0ba421151c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;