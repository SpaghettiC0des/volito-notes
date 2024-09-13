import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDTkiwaTqdPEZZJWwVF2GMjlAOAdpyVaaE",
  authDomain: "personal-kmlopez.firebaseapp.com",
  databaseURL: "https://personal-kmlopez-default-rtdb.firebaseio.com",
  projectId: "personal-kmlopez",
  storageBucket: "personal-kmlopez.appspot.com",
  messagingSenderId: "628454493917",
  appId: "1:628454493917:web:6812fbb5faa58f1e8a9534",
  measurementId: "G-WF6F83LQTR",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
