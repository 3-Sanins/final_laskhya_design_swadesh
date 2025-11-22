
  // Import Firebase SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

  // Your Firebase Config (yaha tera config aa jayega)
  const firebaseConfig = {
  apiKey: "AIzaSyCA_H8mTHSPGKZxmadwDAHZfEcS3pqvLMY",
  authDomain: "swadeshi-84d03.firebaseapp.com",
  databaseURL: "https://swadeshi-84d03-default-rtdb.firebaseio.com",
  projectId: "swadeshi-84d03",
  storageBucket: "swadeshi-84d03.firebasestorage.app",
  messagingSenderId: "1047926315874",
  appId: "1:1047926315874:web:1a20eca775794903aaaa3b"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Export DB + Storage
  export const db = getFirestore(app);
  export const storage = getStorage(app);
