"use client";
import { auth } from "@/Services/firebase";
import { useEffect, useState } from "react";
import Complainer from "./complainer";

export default function MyComplaints() {
  const currentUser = auth.currentUser;

  useEffect(() => {
    // fetch complaints on user change
    if (currentUser?.email) getComplaints();
  }, [currentUser]);

  return (
    <>{currentUser?.photoURL?.split(".")[0]==="complainer"? 
      <Complainer /> : <></>
    }</>
  );
}
