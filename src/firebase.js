import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC7xReN2RDJtU877jdtCO5E8mIFh5JN84Y",
  authDomain: "netflix-clone-f7f60.firebaseapp.com",
  projectId: "netflix-clone-f7f60",
  storageBucket: "netflix-clone-f7f60.appspot.com",
  messagingSenderId: "1086913141248",
  appId: "1:1086913141248:web:6800892bc4d80b7c48d6e5",
  measurementId: "G-H259THVK2K",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = (navigate) => {
  signOut(auth)
    .then(() => {
      navigate("/login");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Logout failed");
    });
};

export { auth, db, login, signup, logout };
