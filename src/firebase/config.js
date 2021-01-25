
import firebase from "firebase/app";
// core project contains every thing we require
// always use...
 
import "firebase/firestore";

import 'firebase/auth'
import 'firebase/storage'





const firebaseConfig = {
    apiKey: "AIzaSyBNjd1SS14rcuFkHUnwB4WRSJjIAH17mD0",
    authDomain: "xray-reports.firebaseapp.com",
    projectId: "xray-reports",
    storageBucket: "xray-reports.appspot.com",
    messagingSenderId: "511710159421",
    appId: "1:511710159421:web:e6a3a226c285ad63ce8054"
  };

  firebase.initializeApp(firebaseConfig);
 
// init firestore service
 
const projectFirestore = firebase.firestore();
const timestamp= firebase.firestore.FieldValue.serverTimestamp

const projectAuth=firebase.auth();
const projectStorage=firebase.storage();

// weff   why not change can use this when we require the fire store database
 
export { projectFirestore,projectAuth ,timestamp,projectStorage};
