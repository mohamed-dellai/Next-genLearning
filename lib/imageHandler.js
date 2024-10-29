import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJl6IoTwgZG9i1Sw5NOtNsACGtratc-Ac",
  authDomain: "nexgen-980c7.firebaseapp.com",
  projectId: "nexgen-980c7",
  storageBucket: "nexgen-980c7.appspot.com",
  messagingSenderId: "1056351202962",
  appId: "1:1056351202962:web:3f0757341faa20e251804b",
  measurementId: "G-QBL50QDV86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

