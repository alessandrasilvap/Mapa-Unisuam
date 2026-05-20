//Importa o inicializador
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDH9NjbTibZfK3Ktjen_x5d1upuXvklmCo",
  authDomain: "mapa-unisuam.firebaseapp.com",
  projectId: "mapa-unisuam",
  storageBucket: "mapa-unisuam.appspot.com",
  messagingSenderId: "843845996963",
  appId: "1:843845996963:web:62c5c0a618fa4a4c868a16",
  measurementId: "G-LD5RZL57Y6"
};


//Inicializa a Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);