/**
 * Firebase Reference/Init
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import * as Firebase from 'firebase';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
} from 'react-native-dotenv';

Firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
});

export const FirebaseRef = Firebase.database().ref();
export const FirebaseImgRef = 'https://firebasestorage.googleapis.com/v0/b/'.concat(STORAGE_BUCKET);
export default Firebase;
