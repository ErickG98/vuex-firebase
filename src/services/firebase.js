import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyB9AKBLikojdmMiiO1WU946Np5N4V_OJsQ",
    authDomain: "vuejstesting98.firebaseapp.com",
    databaseURL: "https://vuejstesting98.firebaseio.com",
    projectId: "vuejstesting98",
    storageBucket: "vuejstesting98.appspot.com",
    messagingSenderId: "866790349299",
    appId: "1:866790349299:web:93ba3cba4d5ab8e4209a86",
    measurementId: "G-068128J0QZ"
  };

  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();
  export const auth = firebase.auth();