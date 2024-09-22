// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // Import the function to initialize the Firebase app
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
 // Import Firebase Authentication
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfRVNe9TS5WFrpLkY4qEbZPY9UrqwpyGs",
  authDomain: "fir-frontend-364bb.firebaseapp.com",
  projectId: "fir-frontend-364bb",
  storageBucket: "fir-frontend-364bb.appspot.com",
  messagingSenderId: "136352489553",
  appId: "1:136352489553:web:51ae90bf4f32cf749ad870",
  measurementId: "G-J7EEEJ800Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase with your app's configuration
const analytics = getAnalytics(app); // Initialize Firebase Analytics
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app);
const storage = getStorage(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, app, db, storage };
