import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

import { firebaseConfig } from "./firebaseConfig"

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)

// export const auth = firebase.auth()
