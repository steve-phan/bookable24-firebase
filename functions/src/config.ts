import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

initializeApp({
  apiKey: "AIzaSyB3ycs7ejcmtHonG_NdzEQzqf-gWJp9sHU",
  authDomain: "bookable24-61ec2.firebaseapp.com",
  projectId: "bookable24-61ec2",
})

export const db = getFirestore()
