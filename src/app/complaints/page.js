"use client";
import { getComplaintsByEmailId } from "@/Services/api";
import { auth } from "@/Services/firebase";
import { useEffect, useState } from "react";
import { Loader } from "../Static/Loader";
import Complaint from "./Complaint";
import { redirect } from "next/navigation";

export default function MyComplaints() {
  const currentUser = auth.currentUser;
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch complaints on user change
    if (currentUser?.email) getComplaints();
  }, [currentUser]);

  const populateData = (dataArray) => {
    const newArray = [];
    dataArray.forEach((doc) => {
      newArray.push({ ...doc.data(), id: doc.id });
    });
    setComplaints(newArray);
  };
  const getComplaints = () => {
    setLoading(true);
    getComplaintsByEmailId(currentUser.email)
      .then((res) => {
        console.log(res);
        populateData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="vh-100 pt-3">
      {complaints.length ? null : (
        <div className="mt-5 text-center">No complaints...</div>
      )}
      <div className="row g-md-2 g-3 justify-content-center">
        {complaints.map((value, index) => {
          return <Complaint data={value} key={index} index={index} />;
        })}
      </div>
      {loading && !complaints.length ? <Loader /> : null}
      <div className="w-100 d-flex justify-content-center">
        <button className="btn btn-info m-3" onClick={getComplaints}>
        <i className="bi bi-cloud-download-fill"></i> Fetch Complaints
        </button>
        <button
          className="btn btn-info m-3"
          onClick={() => redirect("/complaints")}
        >
          <i className="bi bi-list-ul"></i> All Complaints Page
        </button>
      </div>
    </div>
  );
}
