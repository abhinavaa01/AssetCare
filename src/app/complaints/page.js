"use client";
import { auth } from "@/Services/firebase";
import Complainer from "./complainer";
import Maintainer from "./Maintainer";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function MyComplaints() {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  return (
    <>{currentUser?.photoURL?.split(".")[0].toLowerCase()==="complainer"? 
      <Complainer currentUser={currentUser} /> : <Maintainer currentUser={currentUser} />
    }
    <div>{currentUser?.photoURL}</div></>
  );
}
