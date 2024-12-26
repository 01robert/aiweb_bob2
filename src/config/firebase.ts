import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { env } from './env'

// Firebase 配置
const firebaseConfig = env.firebase

// 初始化 Firebase
let app: FirebaseApp
let auth: Auth
let db: Firestore

try {
  // 避免重复初始化
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
    console.log('Firebase initialized successfully')
  } else {
    app = getApps()[0]
    console.log('Using existing Firebase instance')
  }
  
  auth = getAuth(app)
  db = getFirestore(app)
} catch (error) {
  console.error('Firebase initialization error:', error)
  throw error
}

export { app, auth, db } 