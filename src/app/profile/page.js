"use client";
import { updateNameAndRole, updateProfileData, verifyMail } from "@/Services/auth";
import { auth } from "@/Services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(auth.currentUser);
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({
    phone: user?.phoneNumber || "",
    name: user?.displayName || "",
    role: user?.photoURL?.split(".")[0] || "",
    category: user?.photoURL?.split(".")[1] || "",
    email: user?.email || "",
    loading: false,
    errormsg: "",
    successmsg: "",
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

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

  const failure = (msg) => {
    setValues({
      successmsg: "",
      errormsg: msg,
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

  const verifyMailSend = (e) => {
    verifyMail()
      .then((res) => {
        success("Verification Mail sent Successfully! check your inbox.");
      })
      .catch((err) => {
        failure(err.message? err.message : err);
      });
  };

  const updateField = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    updateField("loading", true);
    updateProfileData(values.name, values.phone, values.role, values.category).then((res)=> {
      success("Profile updated successfully!");
      setEditing(false);
    }).catch((err)=> {
      failure(err.message? err.message : err);
    })
  };

  const editProfile = (e) => {
    console.log("sdfg");
    setEditing(true);
  };

  return (
    <>
      <div className="py-5">
        <h1 className="text-center">Profile Details</h1>
        <hr />
        <div className="row col-10 col-md-8 ps-3 mx-auto">
          <table className="my-4 table">
            <tbody className="mb-4">
              <tr>
                <th scope="row" className="fw-bold fs-5 py-3">
                  Full Name :
                </th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => updateField("name", e.target.value)}
                    value={values.name}
                    disabled={!editing}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row" className="fw-bold fs-5 py-3">
                  Phone :
                </th>
                <td>
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="XXXXXXXX"
                    value={values.phone}
                    disabled={!editing}
                    onChange={(e)=> updateField("phone", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row" className="fw-bold fs-5 py-3">
                  Role :
                </th>
                <td>
                  <select
                    className="form-select"
                    defaultValue={values.role}
                    disabled={!editing}
                    onChange={(e) => updateField("role", e.target.value)}
                  >
                    <option value="complainer">Complainer</option>
                    <option value="maintainer">Maintainer</option>
                  </select>
                </td>
              </tr>
              {values.role === "maintainer" ? (
                <tr>
                  <th scope="row" className="fw-bold fs-5 py-3">
                    Category :
                  </th>
                  <td>
                    <select
                      className="form-select"
                      defaultValue={values.category}
                      disabled={!editing}
                      onChange={(e) => updateField("category", e.target.value)}
                    >
                      <option value="carpenter">Carpenter</option>
                      <option value="plumber">Plumber</option>
                      <option value="electrician">Electrician</option>
                    </select>
                  </td>
                </tr>
              ) : null}
              <tr>
                <th scope="row" className="fw-bold fs-5 py-3">
                  Email :
                </th>
                <td colSpan="2" className="position-relative">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="abc@org.com"
                    value={values.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    disabled={!editing}
                  />
                  <div>
                    {user?.emailVerified ? (
                      <span className="text-success">
                        {" "}
                        <i className="bi bi-patch-check"></i> Email is Verified!
                      </span>
                    ) : (
                      <>
                        <span className="text-danger">
                          {" "}
                          <i className="bi bi-patch-exclamation"></i> Email is
                          not Verified!{" "}
                        </span>
                        <a onClick={verifyMailSend} className="">
                          Verify now!
                        </a>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
          <button
            className="btn btn-info py-3 my-5"
            onClick={editing ? saveProfile : editProfile}
          >
            <b className="fs-5">{editing ? "Save Profile" : "Edit Profile"}</b>
          </button>
        </div>
      </div>
    </>
  );
}