import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0TCnZqLSsy5np9yS8dwhoCHJbAvGcuAU",
  authDomain: "file-app-9fac6.firebaseapp.com",
  projectId: "file-app-9fac6",
  storageBucket: "file-app-9fac6.firebasestorage.app",
  messagingSenderId: "652404805539",
  appId: "1:652404805539:web:688e3455b6638076cc1416",
  measurementId: "G-QFW4ZYSLEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);

export { storage }