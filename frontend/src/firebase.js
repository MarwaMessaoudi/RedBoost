// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";  // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTi089Xx5gL45fsSs7RZx9Q6Ty9Q-vHvs",
  authDomain: "redboost-31694.firebaseapp.com",
  projectId: "redboost-31694",
  storageBucket: "redboost-31694.appspot.com",
  messagingSenderId: "327482163159",
  appId: "1:327482163159:web:cf2fde68310e229dea5592",
  measurementId: "G-NHSZBPC11V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);  // Initialize Firebase Storage

export { storage };  // Export the storage instance for use in other files
