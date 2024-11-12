"use client";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./Static/Header";
import { auth } from "@/Services/firebase";
import { useState } from "react";
import { redirect } from "next/navigation";
import Footer from "./Static/Footer";

export default function Home() {
  const [currentUser, setCurrentUser] = useState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

//   setTimeout(() => {
//     if (!currentUser) {
//       redirect("/login");
//     }
//   }, 3000);

  return (
    <>
      <Header />
      <div className="main-col">
        <></>
      </div>
      <Footer />
    </>
  );
}
