import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

export const signUpUser = (email, pass) => {
  return createUserWithEmailAndPassword(auth, email, pass).then(
    (userCredential) => {
      const user = userCredential.user;
      // signed up
    }
  );
};

export const signInUser = (email, pass) => {
  return signInWithEmailAndPassword(auth, email, pass).then(
    (userCredential) => {
      const user = userCredential.user;
      // signed in
    }
  );
};

export const updateName = (name) => {
  return updateProfile(auth.currentUser, {
    displayName: name
  });
};

export const updateNameAndRole = (name, role) => {
  return updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: role
  });
};

export const updateProfileData = (name, phone, role, category) => {
  // console.log("name: " +name, "phone: " +phone,"role: " + role,"category: " + category);
  return updateProfile(auth.currentUser, {
    displayName: name,
    phoneNumber: phone,
    photoURL: role + "." + category
  });
};

export const logOut = () => {
  return signOut(auth);
};

export const verifyMail = () => {
  return sendEmailVerification(auth.currentUser);
};
