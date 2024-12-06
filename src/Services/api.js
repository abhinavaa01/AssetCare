import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const registerComplaint = async (values) => {
  return await addDoc(collection(db, "complaints"), {
    userName: values.name,
    userEmail: values.email,
    userPhone: values.phone,
    category: values.category,
    createDate: new Date(),
    status: "Complaint Received",
  });
};

export const getComplaintsByEmailId = async (emailId) => {
  const docRef = collection(db, "complaints");
  const q = query(docRef, where("userEmail", "==", emailId));
  return await getDocs(q);
};

export const getComplaintsByCategory = async (category) => {
  const docRef = collection(db, "complaints");
  const q = query(docRef, where("category", "==", category));
  return await getDocs(q);
};

export const assignComplaintTo = async (docId, maintainer) => {
  const docRef = doc(db, "complaints", docId);
  return updateDoc(docRef, {
    assignedTo: maintainer.name,
    assignedToNumber: maintainer.phone
  })
};
