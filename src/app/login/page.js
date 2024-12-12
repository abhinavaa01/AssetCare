"use client";
import { useState } from "react";
import { signInUser, signUpUser, updateName } from "@/Services/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Services/firebase";
import { redirect } from "next/navigation";

export default function Login() {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [signIn, setSignIn] = useState(true);
  const [values, setValues] = useState({
    name: "",
    mail: "",
    pass: "",
    role: "",
    loading: false,
    successmsg: "",
    errormsg: ""
  });
  console.log(values);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  setTimeout(() => {
    if (currentUser) {
      redirect("/");
    }
  }, 3000);

  const formChangeHandler = (e) => {
    console.log(e);
    setSignIn(!signIn);
  };

  const updateField = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  const handleLoading = (state) => {
    setValues({
      errormsg: "",
      successmsg: "",
      loading: state,
    });
  };

  const failure = (msg) => {
    setValues({
      errormsg: msg,
      successmsg: "",
      loading: "",
    });
    setTimeout(() => {
      setValues({
        errormsg: "",
        successmsg: "",
        loading: false,
      });
    }, 2500);
  };

  const success = (msg) => {
    setValues({
      errormsg: "",
      successmsg: msg,
      loading: "",
    });
    setTimeout(() => {
      setValues({
        errormsg: "",
        successmsg: "",
        loading: false,
      });
    }, 2500);
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    handleLoading(true);
    signUpUser(values.mail, values.pass)
      .then((userCredentials) => {
        success("User Signed Up successFully! Redirecting to home page...")
        // save the remaining user info
        updateNameAndRole(values.name, values.role);
        console.log(userCredentials);
      })
      .catch((err) => {
        failure(err.message? err.message : err);
      });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    handleLoading(true);
    console.log(values.mail, values.pass);
    signInUser(values.mail, values.pass)
      .then((userCredentials) => {
        success("Signed in successfully! Please wait till you are redirected to the home page...");
        // user signed in
        console.log(userCredentials);
      })
      .catch((err) => {
        failure(err.message? err.message : err);
      });
  };
  return (
    <>
      <div className="d-flex card my-4 py-3">
        <h2 className="mx-auto my-auto text-center mb-4">
          Signin with your AssetCare account or create One!
        </h2>

        <div className="d-flex mx-auto my-auto mb-4">
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
          <form className="card col-10 col-md-8 col-lg-6 mx-auto py-4" onSubmit={signInHandler}>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i className="bi bi-envelope-at"></i>
              </span>
              <input
                type="email"
                value={values.mail}
                placeholder="Email Address"
                className="mx-auto form-control text-start border"
                onChange={(e)=>updateField("mail", e.target.value)}
              ></input>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i className="bi bi-key"></i>
              </span>
              <input
                type="password"
                value={values.pass}
                placeholder="Password"
                className="mx-auto form-control text-start border"
                onChange={(e)=>updateField("pass", e.target.value)}
              ></input>
            </div>

            <button
              type="submit"
              className="btn btn-info w-auto mx-auto my-3"
              onClick={signInHandler}
            >
              SIGNIN
            </button>
          </form>
        ) : (
          <form className="card col-10 col-md-8 col-lg-6 mx-auto py-4" onSubmit={signUpHandler}>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i className="bi bi-person-workspace"></i>
              </span>
              <select
                value={values.role}
                className="mx-auto form-control text-start border"
                onChange={(e)=>updateField("role", e.target.value)}
              >
                <option value="complainer">COMPLAINER</option>
                <option value="maintainer">MAINTAINER</option>
              </select>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i className="bi bi-alphabet"></i>
              </span>
              <input
                type="name"
                value={values.name}
                placeholder="Full Name"
                className="mx-auto form-control text-start border"
                onChange={(e)=>updateField("name", e.target.value)}
              ></input>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i className="bi bi-envelope-at"></i>
              </span>
              <input
                type="email"
                value={values.mail}
                placeholder="Email Address"
                className="mx-auto form-control text-start border"
                onChange={(e)=>updateField("mail", e.target.value)}
              ></input>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">
                <i className="bi bi-key"></i>
              </span>
              <input
                type="password"
                value={values.pass}
                placeholder="Password"
                className="mx-auto form-control text-start border"
                onChange={(e)=>updateField("pass", e.target.value)}
              ></input>
            </div>

            <button
              type="submit"
              className="btn btn-info w-auto mx-auto my-3"
              onClick={signUpHandler}
            >
              SIGNUP
            </button>
          </form>
        )}
        {values.errormsg ? (
            <div className="form-group text-start col-10 col-md-6 mx-auto mt-3 animate__animated animate__pulse">
              <div
                className="form-check-label alert alert-danger text-capitalized"
                id="loginerror"
              >
                <i className="bi bi-exclamation-circle-fill"></i>{" "}
                {values.errormsg}
              </div>
            </div>
          ) : (
            <></>
          )}
          {values.successmsg ? (
            <div className="form-group text-start col-10 col-md-6 mx-auto mt-3">
              <div
                className="form-check-label alert alert-success text-capitalized"
                role="alert"
              >
                <i className="bi bi-check-circle-fill"></i> {values.successmsg}
              </div>
            </div>
          ) : (
            <></>
          )}
          {values.loading ? (
            <div className="form-group text-start col-10 col-md-6 mx-auto mt-3">
              <div
                className="form-check-label alert alert-warning text-capitalized"
                role="alert"
              >
                <span className="spinner-border spinner-border-sm"></span>{" "}
                Loading...
              </div>
            </div>
          ) : (
            <></>
          )}
      </div>
    </>
  );
}
