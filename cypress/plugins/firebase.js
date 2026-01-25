import admin from "firebase-admin";

// /**
//  * Initialize Firebase Admin ONLY once
//  */
// if (!admin.apps.length) {
//   const privateKey = process.env.FIREBASE_PRIVATE_KEY;

//   if (!privateKey) {
//     throw new Error("❌ FIREBASE_PRIVATE_KEY is not defined");
//   }

//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: privateKey.replace(/\\n/g, "\n"),
//     }),
//   });
// }

const db = admin.firestore();

/**
 * Delete ALL tasks whose title contains a given substring
 * @param {string} substring
 */
export async function deleteTasksByTitleContains(substring) {
  if (!substring) {
    throw new Error("❌ substring is required");
  }

  const tasksRef = db.collection("tasks");

  // Firestore does not support "contains" queries,
  // so we fetch and filter in memory
  const snapshot = await tasksRef.get();

  const batch = db.batch();
  let deleteCount = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    const title = data.title || "";

    if (title.includes(substring)) {
      batch.delete(doc.ref);
      deleteCount++;
    }
  });

  if (deleteCount > 0) {
    await batch.commit();
  }

  console.log(`🔥 Deleted ${deleteCount} task(s) containing "${substring}"`);

  return deleteCount;
}
