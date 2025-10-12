// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDRrfYZvXJjuUkSNqzaLi-LPD6hNBUIpdY',
  authDomain: 'email-password-auth-855eb.firebaseapp.com',
  projectId: 'email-password-auth-855eb',
  storageBucket: 'email-password-auth-855eb.firebasestorage.app',
  messagingSenderId: '988340052617',
  appId: '1:988340052617:web:6f52fd0ab5e21e33691c58',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);