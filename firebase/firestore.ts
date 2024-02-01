import {
  updateDoc,
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  arrayUnion as firestoreArrayUnion,
} from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);

export {
  collection,
  doc,
  setDoc,
  firestoreArrayUnion as arrayUnion,
  db,
  updateDoc,
  getDoc,
};
