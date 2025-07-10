
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCi9lWOkd3cLDSyKEFQaKPwL6hm6rI7kGs",
  authDomain: "fir-b9b30.firebaseapp.com",
  databaseURL: "https://fir-b9b30-default-rtdb.firebaseio.com",
  projectId: "fir-b9b30",
  storageBucket: "fir-b9b30.firebasestorage.app",
  messagingSenderId: "248646096456",
  appId: "1:248646096456:web:16fd79365833669b476a7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();
export const dbRef = ref(getDatabase());
