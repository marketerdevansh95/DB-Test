"use client";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState();

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.BASE_URL}/api/userroutes/forgotPassword/${email}`
    ).then((res) => {
      if (res.status === 201) {
        window.location.href = "/login";
      } else if (res.status === 500) {
        // console.log(res);
      }
    });
  };

  return (
    <>
      <div className="container wrapper lw">
        <div className="login-wrapper">
          <div className="row wrapper-top text-center">
            <h1>Reset Password</h1>
          </div>
          <form onSubmit={(e) => handleForgotSubmit(e)}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label id="email-label" htmlFor="email">
                    User Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter User Email"
                    className="form-control"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <button type="submit" id="submit" className="btn-wrap lw">
                  Submit
                </button>
              </div>
              <Link href={"/login"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
