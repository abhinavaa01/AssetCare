"use client";
import { getComplaintsByEmailId } from "@/Services/api"
import { auth } from "@/Services/firebase";
import { useEffect, useState } from "react";

export default function MyComplaints() {
    const currentUser = auth.currentUser;
    const [complaints, setComplaints] = useState([]);

    useEffect(()=> {
        // fetch complaints on user change
    }, [currentUser])
    const getComplaints = () => {
        getComplaintsByEmailId(currentUser.email).then((res)=> {
            console.log(res);
        }).catch((err)=> {
            console.log(err);
        })
    }
    return (
        <div className="col-md-6 col-12 border-end border-3 vh-100 pt-3">
            <div className="mt-5 text-center">No complaints...</div>
            <button onClick={getComplaints}>Get complaints</button>
        </div>
    )
}