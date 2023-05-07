import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  // getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOPCvr1Nl--enQIE3yCew6u3A0vyKiRos",
  authDomain: "dont-firebase.firebaseapp.com",
  projectId: "dont-firebase",
  storageBucket: "dont-firebase.appspot.com",
  messagingSenderId: "946471568465",
  appId: "1:946471568465:web:ed53877ccee90ee54ea470",
  measurementId: "G-XH4W37X5NW",
};

// initialize app
initializeApp(firebaseConfig);

// initialize service for frontend
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// firestore queries
const que = query(colRef, where("author", "!=", "Ashneer Grover"));

// get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     const books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((error) => {
//     console.log("error", error);
//   });

// real time collection data
// onSnapshot(colRef, (snapshot) => {
onSnapshot(que, (snapshot) => {
  const books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding document
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
