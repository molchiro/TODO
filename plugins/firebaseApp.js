import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore/dist/index.cjs'

const firebaseConfig = {
  apiKey: 'AIzaSyBOzcKiuiIgO19Wv9_A10cvUIL1mdKDPSs',
  authDomain: 'todo-9f0eb.firebaseapp.com',
  databaseURL: 'https://todo-9f0eb.firebaseio.com',
  projectId: 'todo-9f0eb',
  storageBucket: 'todo-9f0eb.appspot.com',
  messagingSenderId: '697697900783',
  appId: '1:697697900783:web:c8f130356760eb9d'
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const googleProvider = new firebase.auth.GoogleAuthProvider()

export const db = firebase.firestore()
export const storage = firebase.storage()
export const auth = firebase.auth()
export { googleProvider }
export default firebase.app()
