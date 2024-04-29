import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyBvf17nDo6sNZmf9tEBHI6ABsboiR8pQQk",
  // authDomain: "firstapp-81884.firebaseapp.com",
  // databaseURL: "https://firstapp-81884-default-rtdb.firebaseio.com",
  // projectId: "firstapp-81884",
  // storageBucket: "firstapp-81884.appspot.com",
  // messagingSenderId: "640215432215",
  // appId: "1:640215432215:web:52a2c185664dd83d90b052",
  // measurementId: "G-JWCKZFRN31"
  apiKey: "AIzaSyB8KqTlP9WjTY21Pi1URy60L6QQNPZ_qgk",
  authDomain: "coffee-2ae7c.firebaseapp.com",
  databaseURL:"https://coffee-2ae7c-default-rtdb.firebaseio.com/",
  projectId: "coffee-2ae7c",
  storageBucket: "coffee-2ae7c.appspot.com",
  messagingSenderId: "864222648247",
  appId: "1:864222648247:web:859a01790615baa7d73a32",
  measurementId: "G-R1RVY09EGY"

  };

  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
  export { auth , createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup };
