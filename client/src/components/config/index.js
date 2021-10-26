
import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD53mKoKKXu3_a6RZdLvexZHiJEYzKAvaY",
    authDomain: "todo-328510.firebaseapp.com",
    projectId: "todo-328510",
    storageBucket: "todo-328510.appspot.com",
    messagingSenderId: "748391034640",
    appId: "1:748391034640:web:74bebccb3ca288dd8bff95"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
