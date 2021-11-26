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

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = await userRef.get();

   if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const creatAt = new Date();

      try {
         await userRef.set({
            displayName,
            email,
            creatAt,
            ...additionalData,
         });
      } catch (error) {
         console.log(error);
      }
   }
   return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
   const collectionRef = firestore.collection(collectionKey);

   const batch = firestore.batch();

   objectToAdd.forEach((obj) => {
      const DocumentRef = collectionRef.doc();
      batch.set(DocumentRef, obj);
   });

   return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
   const transformedCollection = collections.docs.map((doc) => {
      const { title, items } = doc.data();

      return {
         routeName: encodeURI(title.toLowerCase()),
         id: doc.id,
         title,
         items,
      };
   });
   return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
   }, {});
};

export const getCurrentUser = () => {
   return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((userAuth) => {
         unsubscribe();
         resolve(userAuth);
      }, reject);
   });
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
