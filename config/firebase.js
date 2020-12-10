import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'


 let firebaseConfig = {
    apiKey: "AIzaSyBIGj6rmGG7ssveyricdyPzAK2odmeRORw",
    authDomain: "shoppingcart-53a3f.firebaseapp.com",
    databaseURL: "https://shoppingcart-53a3f.firebaseio.com",
    projectId: "shoppingcart-53a3f",
    storageBucket: "shoppingcart-53a3f.appspot.com",
    messagingSenderId: "700074138162",
    appId: "1:700074138162:web:b4a1b529f2c323a7cb3a2b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();

  export const firestore= firebase.firestore();