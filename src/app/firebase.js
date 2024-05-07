import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD2ROpjJaM7tgyTBoZP5GzfDiHeTqoJ_2I",
  authDomain: "logo-e9f8d.firebaseapp.com",
  projectId: "logo-e9f8d",
  storageBucket: "logo-e9f8d.appspot.com",
  messagingSenderId: "884606678603",
  appId: "1:884606678603:web:c29fb7776cf0f0c8037fce",
  measurementId: "G-88615ZSRL9"
};

// Initialize Firebase
const app = firebase.initializeApp(config);
export default app;
const analytics = getAnalytics(app);
