import { firebaseConfig } from "./config";
import { getAuth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         onAuthStateChanged,
         signOut
       } from "firebase/auth";
import { initializeApp } from "@firebase/app";

const fbService = initializeApp(firebaseConfig);

const auth = getAuth(fbService);

/**
 * Creates a user account with given credentials using Firebase.
 */
async function createUserAccount(email, password) {
  try {
    let credentials = await createUserWithEmailAndPassword(auth, email, password);
    
    return credentials;
  } catch (error) {
    console.log("Sign-up error!");
    console.log(error);
    return null;
  }

}

/**
 * Signs in the user with given credentials using Firebase.
 */
async function signInUser(email, password) {
  try {
    let credentials = 
      await signInWithEmailAndPassword(auth, email, password);

    return credentials;
  } catch (error) {
    console.log("Login error!");
    console.log(error);
    return null;
  }
}


/**
 * Identifies whether or not the user is signed in.
 * Paired with onAuthStateChanged, we can tell if the user 
 * is signed in depending on the value that this variable
 * is assigned.
 * 
 * Unfortunately, there doesn't seem to be a way to
 * truly separate the code from this.
 */

function signOutUser() {
  signOut(auth);
}

const authStateObserver = (nextOrObserver) => {
  return onAuthStateChanged(auth, nextOrObserver);
}

const manageUserState = (user, setState) => {
  if (user) {
    console.log(user);
    setState(user);
  } else {
    // signed out, 
    // do not allow access to app
    setState(user);
  }
};


export {createUserAccount, signInUser, signOutUser, auth, authStateObserver};