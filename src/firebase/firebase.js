import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.email}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email, uid } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        uid,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const doSendVerificationEmail = () =>
  auth.currentUser.sendEmailVerification({
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
  });

export const doPasswordReset = email => auth.sendPasswordResetEmail(email);
export const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password);

export default firebase;
