"use client";

import { useState } from "react";
import Header from "./Static/Header";

export default function Home() {
    const [signIn, setSignIn] = useState(true);

  return (
    <>
      <Header />
      <div className="main-col">
        <div className="main-col d-flex card my-4 py-3">
          <h2 className="mx-auto my-auto">
            Signin with your AssetCare account or create One!
          </h2>

          
        </div>
      </div>
    </>
  );
}
