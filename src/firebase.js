import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAcRDlbi4J8QUC4kq0bjz1KtGEBUxdjyY",
    authDomain: "netflix-clone-cb6e8.firebaseapp.com",
    projectId: "netflix-clone-cb6e8",
    storageBucket: "netflix-clone-cb6e8.firebasestorage.app",
    messagingSenderId: "208638149296",
    appId: "1:208638149296:web:9ab2f6683635e38450f175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


const signup = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })

    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const login = async (email, password) => {
    try {
        
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = () => {
    signOut(auth);
}


export { auth, db, login, signup, logout };