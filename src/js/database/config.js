// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2fHplqZokIpZShVdFRHjE95Wqt-9_BLQ",
  authDomain: "roadtrypper.firebaseapp.com",
  projectId: "roadtrypper",
  storageBucket: "roadtrypper.appspot.com",
  messagingSenderId: "376562411442",
  appId: "1:376562411442:web:504c86ddcd22d3433566ab"
};

// Initialize Firebase
const fbase = initializeApp(firebaseConfig);

export default fbase;