// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

module.exports = { admin, db };
