import admin from "firebase-admin"

import * as serviceAccountKey from "./key.json"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
})

const db = admin.firestore()

export { admin, db }
