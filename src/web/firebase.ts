import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { DbBase, DbLayout } from '../backend/db/db.base';

const firebaseConfig = {
    apiKey: 'AIzaSyBm7H-ccEuECJXxP4hAPSnew0E6HyGmeoo',
    authDomain: 'shockrtools.firebaseapp.com',
    databaseURL: 'https://shockrtools.firebaseio.com',
    projectId: 'shockrtools',
    storageBucket: 'shockrtools.appspot.com',
    messagingSenderId: '803916636929',
    appId: '1:803916636929:web:74c4164f05716c0b0d7100',
};

export const FirebaseClient = firebase.initializeApp(firebaseConfig);
export const firestore = FirebaseClient.firestore();

export const FireStoreBases = firestore.collection('base') as firebase.firestore.CollectionReference<DbBase>;
export const FireStoreLayouts = firestore.collection('layout') as firebase.firestore.CollectionReference<DbLayout>;
