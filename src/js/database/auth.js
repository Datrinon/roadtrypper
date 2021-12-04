import { getAuth,
         createUserWithEmailandPassword,
         signInWithEmailAndPassword,
         onAuthStateChanged,
       } from "firebase/auth"
import fbService from "./config";

const auth = getAuth(fbService);

/**
 * Creates a user account with given credentials using Firebase.
 */
async function createUserAccount(email, password) {
  try {
    let credentials =
      await createUserWithEmailandPassword(auth, email, password);
    
  } catch (error) {
    console.log("Sign-up error!");
    console.log(error);
  }
}

/**
 * Signs in the user with given credentials using Firebase.
 */
async function signInUser(email, password) {
  try {
    let credentials = 
      await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("Login error!");
    console.log(error);
  }
}


/**
 * Identifies whether or not the user is signed in.
 * Paired with onAuthStateChanged, we can tell if the user 
 * is signed in depending on the value that this variable
 * is assigned.
 */
let userInfo;
onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo = user;
  } else {
    // signed out, 
    // do not allow access to app
    userInfo = null;
  }
});

export {createUserAccount, signInUser, userInfo};