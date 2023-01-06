import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyA8A428Co2uZLFxrgtK-n7BxyBuYpu69TI',
  authDomain: 'com.beetlejuice.imu',
  databaseURL: 'https://project-imu-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'project-imu',
  storageBucket: 'project-imu.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:167329016926:android:e9b29e7c1e29eadab358cf',
  measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, storage, database };