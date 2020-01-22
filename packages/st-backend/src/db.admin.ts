import * as admin from 'firebase-admin';
admin.initializeApp();

export const FireStoreAdmin = admin.firestore();
