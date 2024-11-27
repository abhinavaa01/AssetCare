import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
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
