import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyEK8maTGndt1LMenRbI23nU81D8Oyye8",
  authDomain: "music-playlist-app-c3924.firebaseapp.com",
  projectId: "music-playlist-app-c3924",
  storageBucket: "music-playlist-app-c3924.appspot.com",
  messagingSenderId: "252119939843",
  appId: "1:252119939843:web:484bb67688f155a6fcc736",
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { 
    projectFirestore,
    projectAuth,
    projectStorage,
    timestamp
 };

