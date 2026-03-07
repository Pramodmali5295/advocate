import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDJWkHxXU3Y3VJdYmVRJll50_f6yX0QUf8",
  authDomain: "advocate-81126.firebaseapp.com",
  projectId: "advocate-81126",
  storageBucket: "advocate-81126.firebasestorage.app",
  messagingSenderId: "586879889154",
  appId: "1:586879889154:web:5f7036771543a5b5fd5c1b",
  measurementId: "G-15QRXMR9SS"
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Firebase Auth instance
export const auth = getAuth(app);

// Firestore database instance
export const db = getFirestore(app);

// Analytics
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
