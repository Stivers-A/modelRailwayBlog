// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// getAuth for normal signin GoogleAuth is used for google sign in
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmXholoQrRFAdyCa1aolsSOSFvdBDl2ao",
  authDomain: "modeltrainbloggmrr.firebaseapp.com",
  projectId: "modeltrainbloggmrr",
  storageBucket: "modeltrainbloggmrr.appspot.com",
  messagingSenderId: "4028270709",
  appId: "1:4028270709:web:e90256564e51a71980103c",
  measurementId: "G-CQXYCM5Q4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) // cant use auth if it isn't exported for use
export const googleProvider = new GoogleAuthProvider // cant use googleAuth if it isn't exported either
export const database = getFirestore(app)
export const storage = getStorage(app)