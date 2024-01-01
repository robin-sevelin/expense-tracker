import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAhSFg6fEBoDtEjwsYXrA5cU7OT1a1RfC0',
  authDomain: 'expense-tracker-fc31e.firebaseapp.com',
  projectId: 'expense-tracker-fc31e',
  storageBucket: 'expense-tracker-fc31e.appspot.com',
  messagingSenderId: '277895219169',
  appId: '1:277895219169:web:91bb9e41ca324c267974a0',
  measurementId: 'G-8V7NPZQP6H',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy
