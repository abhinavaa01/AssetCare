"use client";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./Static/Header";
import { auth } from "@/Services/firebase";
import { useState } from "react";
import { redirect } from "next/navigation";
import Footer from "./Static/Footer";
import MyComplaints from "./complaints/page";
import AddComplaint from "./Static/AddComplaint";
import Modal from "./Static/Modal";

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
      <div className="main-col d-flex flex-column">
        <div className="m-auto h1">Home page</div>
        <div className="m-auto">
          <button className="btn btn-info" onClick={()=>redirect("/complaints")}>Go to ALL Complaints Page</button>
        <button className="btn btn-info ms-3" data-bs-toggle="modal" data-bs-target="#AddcomplaintModal">New Complaint</button>
        <Modal />
        </div>
      </div>
      <Footer />
    </>
  );
}
