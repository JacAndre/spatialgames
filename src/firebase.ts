import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'


// firebase init
const firebaseConfig = {
    apiKey: "AIzaSyD_FMWOUYpTlfXacnBGxUjazCFhau71sDQ",
    authDomain: "project-c83f3.firebaseapp.com",
    databaseURL: "https://project-c83f3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "project-c83f3",
    storageBucket: "project-c83f3.appspot.com",
    messagingSenderId: "138852401602",
    appId: "1:138852401602:web:6afa12a6d50a3979b3965b",
    measurementId: "G-88FHVJSXRR"
};

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const defaultMutations: object[] = [];
const defaultCollection = db.collection("agentCollection")
defaultCollection.get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    const mutation = {
      "title": doc.id,
      "data": doc.data()
    };
    defaultMutations.push(mutation)
  })
  console.log(defaultMutations)
})


// export utils/refs
export {
  db,
  auth,
  defaultMutations,
  defaultCollection
}
