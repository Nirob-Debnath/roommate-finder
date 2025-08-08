// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5QraP0DxlWD4lzz_8PkeSDc7PG9XKylI",
    authDomain: "find-roommate-5d9b2.firebaseapp.com",
    projectId: "find-roommate-5d9b2",
    storageBucket: "find-roommate-5d9b2.firebasestorage.app",
    messagingSenderId: "283213187240",
    appId: "1:283213187240:web:96bc13f28dd3a451169a9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);