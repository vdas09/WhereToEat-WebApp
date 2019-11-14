import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBsMINjE6OacCsNks430ZeYZlDjaicdxCk",
    authDomain: "wheretoeat-d2275.firebaseapp.com",
    databaseURL: "https://wheretoeat-d2275.firebaseio.com",
    projectId: "wheretoeat-d2275",
    storageBucket: "wheretoeat-d2275.appspot.com",
    messagingSenderId: "890392068939",
    appId: "1:890392068939:web:cd38e102c600856411dece"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  export defualt app;