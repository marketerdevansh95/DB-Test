"use client";
import React from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardHeader = () => {
  console.log("ToastContainer is:", ToastContainer);
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.BASE_URL}/api/userroutes/logoutUser`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    if (res.status == 200) {
      toast.success(res.message, {
        theme: "colored",
      });
      window.location.href = "/login";
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="row header">
        <span>
          <h1>A</h1>
        </span>
        <span className="logout" onClick={(e) => handleLogout(e)}>
          Logout
        </span>
      </div>
    </>
  );
};

export default DashboardHeader;
