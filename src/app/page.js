"use client";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./Static/Header";
import { auth } from "@/Services/firebase";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
    const [currentUser, setCurrentUser] = useState();
onAuthStateChanged(auth, (user) => {
    if (user) {
        setCurrentUser(user);
    } else {
        setCurrentUser(null);
    }
  });

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <div className="main-col">
        
      </div>
    </>
  );
}
