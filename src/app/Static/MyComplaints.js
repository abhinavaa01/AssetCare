"use client";
import { getComplaintsByEmailId } from "@/Services/api"
import { auth } from "@/Services/firebase";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";

export default function MyComplaints() {
    const currentUser = auth.currentUser;
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        // fetch complaints on user change
    }, [currentUser]);

    const populateData = (dataArray) => {
        setComplaints([]);
        dataArray.forEach((doc) => {
            setComplaints(...complaints, doc.data());
        });
    }
    const getComplaints = () => {
        setLoading(true);
        getComplaintsByEmailId(currentUser.email).then((snapShots)=> {
            // console.log(res);
            // populateData(res);
            setComplaints([]);
            snapShots.forEach((doc)=> {
                setComplaints([...complaints, doc.data()]);
            });
            setLoading(false);
        }).catch((err)=> {
            console.log(err);
            setLoading(false);
        })
    }
    return (
        <div className="col-md-6 col-12 border-end border-3 vh-100 pt-3">
            <div className="mt-5 text-center">No complaints...</div>
            {loading && !complaints.length? 
            <Loader /> :null
            }
            <button onClick={getComplaints}>Get complaints</button>
        </div>
    )
}