"use client";
import { useState } from "react";
import Header from "../Static/Header";

export default function Login() {
  const [signIn, setSignIn] = useState(true);
  const [values, setValues] = useState({
    name: "",
    mail: "",
    pass: "",
    role: "",
  });

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
          <div className="card w-50 mx-auto py-4">
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">Email : </span>
              <input
                type="email"
                value={values.mail}
                placeholder="Email Address"
                className="mx-auto form-control text-start border"
                onChange={mailChangeHandler}
              ></input>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">Password :</span>
              <input
                type="password"
                value={values.pass}
                placeholder="Password"
                className="mx-auto form-control text-start border"
                onChange={passChangeHandler}
              ></input>
            </div>

            <button type="submit" className="btn btn-info col-2 mx-auto my-3">
              SIGNIN
            </button>
          </div>
        ) : (
          <div className="card w-50 mx-auto py-4">
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">Role :</span>
              <select
                value={values.role}
                className="mx-auto form-control text-start border"
                onChange={roleChangeHandler}
              >
                <option value="complainer">complainer</option>
                <option value="maintainer">maintainer</option>
              </select>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">Name :</span>
              <input
                type="name"
                value={values.name}
                placeholder="Name"
                className="mx-auto form-control text-start border"
                onChange={nameChangeHandler}
              ></input>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">Email :</span>
              <input
                type="email"
                value={values.mail}
                placeholder="Email Id"
                className="mx-auto form-control text-start border"
                onChange={mailChangeHandler}
              ></input>
            </div>
            <div className="input-group flex-nowrap w-75 mx-auto my-1">
              <span className="input-group-text">Password :</span>
              <input
                type="password"
                value={values.pass}
                placeholder="Password"
                className="mx-auto form-control text-start border"
                onChange={passChangeHandler}
              ></input>
            </div>

            <button type="submit" className="btn btn-info col-2 mx-auto my-3" onClick={signUpHandler}>
              SIGNUP
            </button>
          </div>
        )}
      </div>
    </>
  );
}
