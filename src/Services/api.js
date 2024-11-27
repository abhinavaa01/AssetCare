const { addDoc, collection } = require("firebase/firestore")
const { db } = require("./firebase")

export const registerComplaint = async (values) => {
    return await addDoc(collection(db, "complaints"), {values});
}