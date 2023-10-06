// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg3kyxRM4bP9w4TTTg959g2oIWX3pPka0",
  authDomain: "user-email-password-auth-3dcdc.firebaseapp.com",
  projectId: "user-email-password-auth-3dcdc",
  storageBucket: "user-email-password-auth-3dcdc.appspot.com",
  messagingSenderId: "497596954579",
  appId: "1:497596954579:web:4220b701c678c7808e2126"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export default auth;