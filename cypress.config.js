import { defineConfig } from 'cypress';
import { deleteTasksByTitleContains } from "./cypress/plugins/firebase.js";
import dotenv from "dotenv";
import admin from "firebase-admin";

// dotenv.config();
dotenv.config();

console.log("FIREBASE_PRIVATE_KEY loaded:", !!process.env.FIREBASE_CLIENT_EMAIL);

console.log("env loaded:", !!process.env.FIREBASE_PRIVATE_KEY);
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/", // vite preview default
    setupNodeEvents(on, config) {
      on("task", {
        "firebase:deleteTasksByTitleContains": async (substring) => {
          return deleteTasksByTitleContains(admin,substring);
        },
      });
    },
  },
});