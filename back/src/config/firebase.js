import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAakNNxdf1NcF7tPFcxz4dfdbPvVTr6IJ4",
  authDomain: "kislyakov-net.firebaseapp.com",
  databaseURL: "https://kislyakov-net.firebaseio.com",
  projectId: "kislyakov-net",
  storageBucket: "kislyakov-net.appspot.com",
  messagingSenderId: "628825644633",
  appId: "1:628825644633:web:6d812d77bc26b1d941db48",
  measurementId: "G-SPD2B04ED9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
