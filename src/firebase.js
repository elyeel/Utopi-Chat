import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyArPW2xAVLJli1c2pdqsDxB0OULeomXn5Q",
  authDomain: "utopichat.firebaseapp.com",
  databaseURL: "https://utopichat.firebaseio.com",
  projectId: "utopichat",
  storageBucket: "utopichat.appspot.com",
  messagingSenderId: "901854987491",
  appId: "1:901854987491:web:605b1be2951a464d0cf1d6",
  measurementId: "G-YCSHY1PEB6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
