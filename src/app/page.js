"use client";
import { useState } from "react";
import Header from "./Static/Header";

export default function Home() {
  const [signIn, setSignIn] = useState(true);
  const [values, setValues] = useState({
    name: "",
    mail: "",
    pass: "",
    role: ""
  });

  const formChangeHandler = (e) => {
    // console.log(e);
    setSignIn(!signIn);
  }

  return (
    <>
      <Header />
      <div className="main-col">
        <div className="main-col d-flex card my-4 py-3">
          <h2 className="mx-auto my-auto">
            Signin with your AssetCare account or create One!
          </h2>

          <div className="d-flex mx-auto my-auto">
            <div className="d-flex border p-3 rounded">
              <input type="radio" name="signin" id="signin" className="my-auto" checked={signIn} onChange={formChangeHandler}></input>
              <label htmlFor="signin" className="my-auto ms-2"><h3>Signin</h3></label>
            </div>
            <div className="d-flex border p-3 rounded ms-2">
              <input type="radio" name="signup" id="signup" className="my-auto" checked={!signIn} onChange={formChangeHandler}></input>
              <label htmlFor="signup" className="my-auto ms-2"><h3>Signup</h3></label>
            </div>
          </div>

            <div className="card w-50 mx-auto">
                <h5 className="offset-1">Name :</h5>
                <input type="name" value={values.name} placeholder="Name" className="btn mx-auto col-10 mb-2 text-start border"></input>
                <h5 className="offset-1">Email :</h5>
                <input type="email" value={values.mail} placeholder="Email Id" className="btn mx-auto col-10 mb-2 text-start border"></input>
                <h5 className="offset-1">Password :</h5>
                <input type="password" value={values.pass} placeholder="Password" className="btn mx-auto col-10 mb-2 text-start border"></input>
            </div>
        </div>
      </div>
    </>
  );
}
