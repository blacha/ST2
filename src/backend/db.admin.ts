import * as admin from 'firebase-admin';
admin.initializeApp();

export const FirestoreAdmin = admin.firestore();
