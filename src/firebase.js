// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPGpgaU6-2st4k53oD_hqOYliaGyYHPYQ",
  authDomain: "crypto-dashboard-c1440.firebaseapp.com",
  projectId: "crypto-dashboard-c1440",
  storageBucket: "crypto-dashboard-c1440.appspot.com",
  messagingSenderId: "453054166140",
  appId: "1:453054166140:web:6e938164615819dd4505f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
