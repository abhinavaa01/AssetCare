"use client";
import { auth } from "@/Services/firebase";
import { useEffect, useState } from "react";
import Complainer from "./complainer";
import Maintainer from "./Maintainer";

export default function MyComplaints() {
  const currentUser = auth.currentUser;

  return (
    <>{currentUser?.photoURL?.split(".")[0]==="complainer"? 
      <Complainer /> : <Maintainer />
    }</>
  );
}
