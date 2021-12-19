import fbService from "./config";
import { getAuth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         onAuthStateChanged,
         signOut,
         GoogleAuthProvider,
         signInWithRedirect,
         sendEmailVerification,
         signInAnonymously
       } from "firebase/auth";


// const fbService = initializeApp(firebaseConfig);

const auth = getAuth(fbService);
const googleProvider = new GoogleAuthProvider();

function useGoogleSignIn() {
  signInWithRedirect(auth, googleProvider);
}

function useGuestMode() {
  return signInAnonymously(auth);
}

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
function signInUser(email, password) {
  // try {
  //   let credentials = 
  //     await 

  //   return credentials;
  // } catch (error) {
  //   console.log("Login error!");
  //   console.log(error);
  //   debugger;
  //   return error;
  // }
  return signInWithEmailAndPassword(auth, email, password);
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


function issueEmailVerification() {
  let actionCodeSettings = {
    url: window.location.origin
  };

  return sendEmailVerification(auth.currentUser, actionCodeSettings);
}

export {createUserAccount,
        signInUser,
        signOutUser,
        auth,
        authStateObserver,
        useGoogleSignIn,
        issueEmailVerification,
        useGuestMode};