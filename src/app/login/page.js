"use client";
import { useState } from "react";
import Header from "../Static/Header";
import { signInUser, signUpUser, updateName } from "@/Services/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Services/firebase";
import { redirect } from "next/navigation";
import Footer from "../Static/Footer";

export default function Login() {
  const [currentUser, setCurrentUser] = useState();
  const [signIn, setSignIn] = useState(true);
  const [values, setValues] = useState({
    name: "",
    mail: "",
    pass: "",
    role: "",
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  setTimeout(() => {
    if (currentUser) {
      // console.log(currentUser);
      redirect("/");
    }
  }, 3000);

  const formChangeHandler = (e) => {
    console.log(e);
    setSignIn(!signIn);
  };

  const nameChangeHandler = (e) => {
    // console.log(e);
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const mailChangeHandler = (e) => {
    // console.log(e);
    setValues({
      ...values,
      mail: e.target.value,
    });
  };

  const roleChangeHandler = (e) => {
    // console.log(e);
    setValues({
      ...values,
      role: e.target.value,
    });
  };

  const passChangeHandler = (e) => {
    // console.log(e);
    setValues({
      ...values,
      pass: e.target.value,
    });
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    signUpUser(values.mail, values.pass)
      .then((userCredentials) => {
        // save the remaining user info
        updateNameAndRole(values.name, values.role);
        console.log(userCredentials);
      })
      .catch((err) => err);
  };

  const signInHandler = (e) => {
    e.preventDefault();
    signInUser(values.mail, values.pass)
      .then((userCredentials) => {
        // user signed in
        console.log(userCredentials);
      })
      .catch((err) => err);
  };
  return (
    <>
      <Header />
      <div className="main-col d-flex card my-4 py-3">
        <h2 className="mx-auto my-auto">
          Signin with your AssetCare account or create One!
        </h2>

        <div className="d-flex mx-auto my-auto">
          <div className="d-flex border p-3 rounded">
            <input
              type="radio"
              name="signin"
              id="signin"
              className="my-auto"
              checked={signIn}
              onChange={formChangeHandler}
            ></input>
            <label htmlFor="signin" className="my-auto ms-2">
              <h3>Signin</h3>
            </label>
          </div>
          <div className="d-flex border p-3 rounded ms-2">
            <input
              type="radio"
              name="signup"
              id="signup"
              className="my-auto"
              checked={!signIn}
              onChange={formChangeHandler}
            ></input>
            <label htmlFor="signup" className="my-auto ms-2">
              <h3>Signup</h3>
            </label>
          </div>
        </div>

        {signIn ? (
          <form className="card w-50 mx-auto py-4" onSubmit={signInHandler}>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i class="bi bi-envelope-at"></i>
              </span>
              <input
                type="email"
                value={values.mail}
                placeholder="Email Address"
                className="mx-auto form-control text-start border"
                onChange={mailChangeHandler}
              ></input>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i class="bi bi-key"></i>
              </span>
              <input
                type="password"
                value={values.pass}
                placeholder="Password"
                className="mx-auto form-control text-start border"
                onChange={passChangeHandler}
              ></input>
            </div>

            <button
              type="submit"
              className="btn btn-info col-2 mx-auto my-3"
              onClick={signInHandler}
            >
              SIGNIN
            </button>
          </form>
        ) : (
          <form className="card w-50 mx-auto py-4" onSubmit={signUpHandler}>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i class="bi bi-person-workspace"></i>
              </span>
              <select
                value={values.role}
                className="mx-auto form-control text-start border"
                onChange={roleChangeHandler}
              >
                <option value="complainer">COMPLAINER</option>
                <option value="maintainer">MAINTAINER</option>
              </select>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i class="bi bi-alphabet"></i>
              </span>
              <input
                type="name"
                value={values.name}
                placeholder="Full Name"
                className="mx-auto form-control text-start border"
                onChange={nameChangeHandler}
              ></input>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i class="bi bi-envelope-at"></i>
              </span>
              <input
                type="email"
                value={values.mail}
                placeholder="Email Address"
                className="mx-auto form-control text-start border"
                onChange={mailChangeHandler}
              ></input>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i class="bi bi-key"></i>
              </span>
              <input
                type="password"
                value={values.pass}
                placeholder="Password"
                className="mx-auto form-control text-start border"
                onChange={passChangeHandler}
              ></input>
            </div>

            <button
              type="submit"
              className="btn btn-info col-2 mx-auto my-3"
              onClick={signUpHandler}
            >
              SIGNUP
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}
