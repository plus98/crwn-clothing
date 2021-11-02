// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyDbiIrsc9v17YcYgu6VfyNBUM9j8dU_y6E',
   authDomain: 'crwn-db-c7210.firebaseapp.com',
   projectId: 'crwn-db-c7210',
   storageBucket: 'crwn-db-c7210.appspot.com',
   messagingSenderId: '168605838170',
   appId: '1:168605838170:web:5c5a6a2f516c9f62abe163',
   measurementId: 'G-KT8EHNX8LS',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
