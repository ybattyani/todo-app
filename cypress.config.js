import { defineConfig } from "cypress";
const admin = require('firebase-admin');
import { deleteTasksByTitleContains } from "./cypress/plugins/firebase.js";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4173/", // vite preview default
    setupNodeEvents(on, config) {
      // Initialize Firebase Admin (only once)
      if (!admin.apps.length) {
        // Use the environment variable content for the service account
        admin.initializeApp({
            credential: admin.credential.cert({
              projectId: process.env.FIREBASE_PROJECT_ID,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
              privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            }),
          });
      }
      on('task', {
        "firebase:deleteTasksByTitleContains": (substring) =>
          deleteTasksByTitleContains(substring),
        // Task to delete a Firestore document
        deleteFirestoreDoc(docPath) {
          return admin.firestore().doc(docPath).delete()
            .then(() => null) // Return null as Cypress tasks expect a value
            .catch((err) => {
              console.error(err);
              throw err;
            });
        },
        // Task to delete a user by UID
        deleteUser(uid) {
            return admin.auth().deleteUser(uid)
              .then(() => null)
              .catch((err) => {
                console.error(err);
                throw err;
              });
        },
        // More complex tasks can be added here (e.g., bulk delete collections)
      });
      return config;
    },
  },
});