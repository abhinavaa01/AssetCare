import { redirect } from "next/navigation";
import { Loader } from "../Static/Loader";
import AssignComplaint from "./assignComplaint";
import { auth } from "@/Services/firebase";
import { useEffect, useState } from "react";
import Modal from "../Static/Modal";
import { getComplaintsByCategory } from "@/Services/api";

export default function Maintainer() {
    const currentUser = auth.currentUser;
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);
    const adminData = {
        name: currentUser?.displayName,
        phone: currentUser?.phoneNumber
    }
    
    const getComplaints = () => {
        setLoading(true);
        getComplaintsByCategory(currentUser.photoURL.split(".")[1].toUpperCase())
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


    return (<div className="vh-100 pt-3 dcrust-background">
        {complaints.length ? null : (
          <div className="mt-5 text-center">No complaints...</div>
        )}
        {loading && !complaints.length ? <Loader /> : null}
        <div className="row g-md-2 g-3 justify-content-center">
          {complaints.map((value, index) => {
            return <AssignComplaint data={value} key={index} index={index} maintainer={adminData} />;
          })}
        </div>
        <div className="w-100 d-flex justify-content-center">
          <button className="btn btn-info m-3" onClick={getComplaints}>
          <i class="bi bi-arrow-repeat"></i> Refresh
          </button>
          <button className="btn btn-info m-3" onClick={() => redirect("/")}>
            <i className="bi bi-house"></i> Home Page
          </button>
          {/* <button className="btn btn-info m-3" onClick={() => console.log(currentUser.photoURL)}>
            <i className="bi bi-house"></i> Testing 123
          </button> */}
        </div>
      </div>)
}