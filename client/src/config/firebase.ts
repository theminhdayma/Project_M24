// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "projectreact-dd427.firebaseapp.com",
  projectId: "projectreact-dd427",
  storageBucket: "projectreact-dd427.appspot.com",
  messagingSenderId: "628705096503",
  appId: "1:628705096503:web:46f32a8137a29ac02660b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
