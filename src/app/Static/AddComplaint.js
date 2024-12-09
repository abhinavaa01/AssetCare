"use client";
import { registerComplaint } from "@/Services/api";
import { auth } from "@/Services/firebase";
import { useEffect, useState } from "react";

export default function AddComplaint() {
  const currentUser = auth.currentUser;
  const [values, setValues] = useState({
    // user: currentUser,
    name: currentUser?.displayName,
    email: currentUser?.email,
    emailVerified: currentUser?.emailVerified,
    phone: "",
    category: "",
    issue: "",
    address: "",
  });

  useEffect(() => {
    setValues({
      ...values,
      name: currentUser?.displayName,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
    });
  }, [currentUser]);

  const updateField = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  const verifyInputs = () => {
    const inputVerification = new Promise((resolve, reject) => {
      if (!values.name || !values.email || !values.phone) {
        reject("Please fill user details...");
      } else if (!values.emailVerified) {
        reject("Verify your Email ID first before registering a complaint");
      } else if (!values.category) {
        reject("Please choose the category of your complaint");
      } else if (!values.issue || !values.address) {
        reject("Please enter the issue and address");
      } else {
        resolve("Successfull");
      }
    });
    return inputVerification;
  };

  const newComplaint = (e) => {
    e.preventDefault();
    verifyInputs()
      .then((res) => {
        registerComplaint(values)
          .then((result) => {
            console.log(result);
            alert(`complaint Id ${result.id} registered successfully!`);
          })
          .catch((err) => console.log(err.message));
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <>
      <div className="modal-body pt-3">
        {/* <div className="h4 text-center my-2">
          Facing an issue? Register a new Complaint...
        </div> */}
        <form
          id="NewComplaint"
          onSubmit={newComplaint}
          className="mt-3 d-flex flex-column"
        >
          <div className="input-group flex-nowrap w-75 mx-auto my-1">
            <span className="input-group-text">
              <i className="bi bi-alphabet"></i>
            </span>
            <input
              type="name"
              value={values.name}
              placeholder="Full Name"
              className="mx-auto form-control text-start border"
              onChange={(e) => updateField("name", e.target.value)}
              disabled={true}
            ></input>
          </div>
          <div className="input-group flex-nowrap w-75 mx-auto my-1">
            <span className="input-group-text">
              <i className="bi bi-envelope-at"></i>
            </span>
            <input
              type="email"
              value={values.email}
              placeholder="Email Address"
              className="mx-auto form-control text-start border"
              onChange={(e) => updateField("email", e.target.value)}
              disabled={true}
              title={
                values.emailVerified
                  ? "Email Address verified"
                  : "Email Address not verified"
              }
            ></input>
          </div>
          <div className="input-group flex-nowrap w-75 mx-auto my-1">
            <span className="input-group-text">
              <i className="bi bi-phone"></i>
            </span>
            <input
              type="tel"
              value={values.phone}
              placeholder="Contact Number"
              className="mx-auto form-control text-start border"
              onChange={(e) => updateField("phone", e.target.value)}
            ></input>
          </div>
          <div className="input-group flex-nowrap w-75 mx-auto my-1">
            <span className="input-group-text">
              <i className="bi bi-tag"></i>
            </span>
            <select
              value={values.category}
              className="mx-auto form-control text-start border"
              onChange={(e) => updateField("category", e.target.value)}
            >
              <option value="" disabled hidden>
                Select the Category of complaint
              </option>
              <option value="CARPENTER">CARPENTER</option>
              <option value="PLUMBER">PLUMBER</option>
              <option value="ELECTRICIAN">ELECTRICIAN</option>
            </select>
          </div>
          <div className="input-group flex-nowrap w-75 mx-auto my-1">
            <span className="input-group-text">
              <i className="bi bi-patch-exclamation"></i>
            </span>
            <textarea
              type="name"
              value={values.issue}
              placeholder="Explain your issue in brief here"
              className="m-auto form-control text-start border"
              onChange={(e) => updateField("issue", e.target.value)}
            ></textarea>
          </div>
          <div className="input-group flex-nowrap w-75 mx-auto my-1">
            <span className="input-group-text">
              <i className="bi bi-geo-alt"></i>
            </span>
            <input
              type="name"
              value={values.address}
              placeholder="Where should be the issue addressed at?"
              className="m-auto form-control text-start border"
              onChange={(e) => updateField("address", e.target.value)}
            ></input>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="submit" onClick={newComplaint} data-bs-dismiss="modal" className="btn btn-success">
          Register
        </button>
      </div>
    </>
  );
}
