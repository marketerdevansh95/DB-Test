"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    const res = await fetch(
      `${process.env.BASE_URL}/api/userroutes/loginUser/`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    if (res.status == 201) {
      toast.success(res.message, {
        theme: "colored",
      });
      window.location.href = "/admin";
    } else if (res.status == 401) {
      toast.error(res.message, {
        theme: "colored",
      });
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
      <div className="container wrapper lw">
        <div className="login-wrapper">
          <div className="row wrapper-top text-center">
            <h1>Login</h1>
          </div>
          <form onSubmit={(e) => handleLoginSubmit(e)}>
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
                <div className="form-group">
                  <label id="name-label" htmlFor="name">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className="form-control"
                    onChange={(e) => {
                      setPassword(e.target.value);
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
              <Link href={"/forgot-password"}>Forgot Password</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
