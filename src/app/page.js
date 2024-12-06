"use client";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Services/firebase";
import { useState } from "react";
import { redirect } from "next/navigation";
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
      <div className="main-col d-flex flex-column dcrust-background full-height">
        <div className="m-auto h1">Home page</div>
        <div className="m-auto">
          <button
            className="btn btn-info p-5"
            onClick={() => redirect("/complaints")}
          >
            <i className="bi bi-list h2"></i>
            <span className="h1"> ALL Complaints</span>
          </button>
          {currentUser?.photoURL?.split(".")[0]==="complainer"?
          <button
            className="btn btn-info ms-3 p-5"
            data-bs-toggle="modal"
            data-bs-target="#AddcomplaintModal"
          >
            <i className="bi bi-folder-plus h2"></i>
            <span className="h1"> New Complaint</span>
          </button>: null}
          <Modal />
        </div>
      </div>
    </>
  );
}
