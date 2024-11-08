// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeGFAzaRGJPxTYPDo8DFU2aECcXlOHXdY",
  authDomain: "assetcare-01.firebaseapp.com",
  projectId: "assetcare-01",
  storageBucket: "assetcare-01.firebasestorage.app",
  messagingSenderId: "265763242001",
  appId: "1:265763242001:web:0e57e25c467ebbb49431b0",
  measurementId: "G-81KP8SD2TQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
// export const db = getDatabase(app);