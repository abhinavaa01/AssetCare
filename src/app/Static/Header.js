"use client";
import { logOut, updateNameAndRole, verifyMail } from '@/Services/auth';
import logo from './logo.png'
import { auth } from '@/Services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function Header() {
    const [currentUser, setCurrentUser] = useState();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // console.log(user);
      } else {
        setCurrentUser(null);
      }
    });

    const saveProfile = (e) => {
        redirect("/profile");
        // updateNameAndRole("Abhinav", "Complainer").then((res)=> {
        //     console.log(res);
        // }).catch((err)=> {
        //     console.log(err);
        // });
        // console.log(currentUser);
        alert("Feature coming soon!");
    }

    const verifyMailHandler = (e) => {
        e.preventDefault();
        verifyMail().then((res)=> {
            alert("Verification mail sent! Check your Inbox");
        }).catch((err)=> {
            alert("Something Went Wrong");
        })
    }
    return (
        <div className='mb-5'>
            <div className="row border mb-2 bg-info fixed-top px-3">
                <button onClick={()=>redirect("/")} className='header-logo btn my-auto my-1 py-2 d-flex'>
                    <img src={logo.src} className="h-100 w-100 my-auto" alt="Todo"></img>
                    <h2 className='my-auto ms-2 text-dark'>AssetCare</h2>
                </button>
                {currentUser ?
                    <div className='dropdown w-auto ms-auto'>
                        {/* <button onClick={logout} className='btn btn-info ms-auto me-3 w-auto h-50 my-auto'>Logout</button> */}
                        <button className="header-user-btn fs-2 btn btn-default p-0 m-2 dropdown-toggle my-auto" type="button" id="menu1" data-bs-toggle="dropdown" aria-expanded="false">
                            {false?
                            <img src="./jj" className='header-user-btn my-auto rounded-circle p-0' />:
                            <i className="bi bi-person-circle"></i>}
                        </button>
                        <ul className="dropdown-menu">
                            <li><span className='dropdown-item' onClick={()=>console.log(currentUser)}>Name: {currentUser?.displayName}</span></li>
                            <li><span className='dropdown-item'>Email: {currentUser?.email}</span></li>
                            <li><span className='dropdown-item'>Role: {currentUser?.photoURL?.split(".")[0]}</span></li>
                            {currentUser?.photoURL?.split(".")[0]==="complainer"? 
                                null:<li><button className="dropdown-item" >Category : {currentUser?.photoURL?.split(".")[1]}</button></li>}
                            {currentUser?.emailVerified? 
                                null:<li><button className="dropdown-item fw-bold" onClick={verifyMailHandler}>Verify Email</button></li>}
                            <li><button className="dropdown-item fw-bold" onClick={saveProfile}>Update Profile</button></li>
                            <li><button className="dropdown-item fw-bold" onClick={logOut}>Logout</button></li>
                        </ul>
                    </div> :
                    <>
                        <button onClick={()=>redirect("/login")} className='btn btn-info ms-auto w-auto h-50 my-auto'>Login</button>
                    </>}
            </div>
        </div>
    )
}