```javascript
// firebaseBugSolution.js

import { getFirestore, doc, getDoc, onSnapshot, collection } from "firebase/firestore";

const db = getFirestore();

//Proper use of getDoc with async/await
async function getData(docId){
  const docRef = doc(db, "yourCollection", docId);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()){
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
}

//Proper use of onSnapshot with null value checks
onSnapshot(doc(db, "yourCollection", "someDoc"), (doc) => {
  if (doc.exists()) {
    console.log("Current data: ", doc.data());
  } else {
    console.log("Document does not exist!");
  }
});

//Example of robust data access
getData("yourDocId").then(data => {
  if(data){
    console.log(data.fieldName); //Access field only after checking existence
  } else {
    console.log("Data not found!");
  }
});
```