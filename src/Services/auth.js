import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"


export const signUpUser = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass).then((userCredential)=>{
        const user = userCredential.user;
        // signed up
    });
}

export const signInUser = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass).then((userCredential)=>{
        const user = userCredential.user;
        // signed in
    });
}