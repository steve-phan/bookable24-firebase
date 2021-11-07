import admin from "firebase-admin"

import * as serviceAccountKey from "./key.json"

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
})

const db = admin.firestore(app)

export { db, admin }
