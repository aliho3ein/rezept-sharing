/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPrttDXGshkygfqSlLWzJ5xnFK_Fg0MqY",
  authDomain: "recipe-sharing-tasty-pixel.firebaseapp.com",
  projectId: "recipe-sharing-tasty-pixel",
  storageBucket: "recipe-sharing-tasty-pixel.appspot.com",
  messagingSenderId: "938829431361",
  appId: "1:938829431361:web:0e7675928d9b8126c6bcc0",
  measurementId: "G-KLNSLQTG77",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const storage = getStorage(app);
