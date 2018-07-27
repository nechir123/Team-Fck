import firebase from "firebase";
import "@firebase/firestore";
import ReduxSagaFirebase from "redux-saga-firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDxFmfmesctqNNkxNaPfYLUQypsiFgsh5c",
  authDomain: "fck-site.firebaseapp.com",
  databaseURL: "https://fck-site.firebaseio.com",
  projectId: "fck-site",
  storageBucket: "fck-site.appspot.com",
  messagingSenderId: "1017854360689"
});

const rsf = new ReduxSagaFirebase(firebaseApp);
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
export default rsf;
