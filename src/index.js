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
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
const auth = getAuth()

// collection ref
const colRef = collection(db, "books");

// firestore queries
// const que = query(colRef, where("author", "==", "Robert Kiyosaki"), orderBy("title", "desc"));
const que = query(
  colRef,
  where("author", "==", "Robert Kiyosaki"),
  orderBy("createdAt")
);

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
    createdAt: serverTimestamp(),
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

// get a single document
const singleDocRef = doc(db, "books", "hasm2ygi0uJ0eMe4BuPc");
// getDoc(singleDocRef).then((doc) => {
//   console.log("doc funct: ", doc.data(), doc.id);
// });
// real time handling
onSnapshot(singleDocRef, (doc) => {
  console.log("doc funct: ", doc.data(), doc.id);
});

// updating a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateForm.id.value);
  updateDoc(docRef, {
    title: `${updateForm.title.value}`,
  }).then(() => {
    updateForm.reset();
  });
});
