import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_MTVP_BKVoBMvc7t804Dg8fLIUKzGRRY",
  authDomain: "codequest-e714b.firebaseapp.com",
  projectId: "codequest-e714b",
  storageBucket: "codequest-e714b.appspot.com",
  messagingSenderId: "891702875582",
  appId: "1:891702875582:web:5be6b9c58f0e833eb295ef"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()

export { firestore }
