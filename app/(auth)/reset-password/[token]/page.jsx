"use client";
import React, { useState } from "react";

const ResetPasswordTokenPage = ({ params }) => {
  const { token } = params;
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [show, setShow] = useState(false);
  const [notify, setNotify] = useState(false);

  const handleShowPassword = () => {
    show ? setShow(false) : setShow(true);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmpassword) {
      setNotify(false);
      const data = {
        token: token,
        password: password,
      };
      await fetch(`${process.env.BASE_URL}/api/userroutes/resetPassword`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.href="/login"
        });
    } else {
      setNotify(true);
    }
  };

  return (
    <>
      <div className="container wrapper lw">
        <div className="login-wrapper">
          <div className="row wrapper-top text-center">
            <h1>Login</h1>
          </div>
          <form onSubmit={(e) => handleResetSubmit(e)}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label id="password-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    id="brand"
                    placeholder="Enter Password"
                    className="form-control"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setNotify(false);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label id="name-label" htmlFor="name">
                    Confirm Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="Confirm Password"
                    className="form-control"
                    onChange={(e) => {
                      setConfirmpassword(e.target.value);
                      setNotify(false);
                    }}
                    required
                  />
                  {notify ? <p>Password Not Match</p> : ""}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group showpassword">
                  <label htmlFor="showpassword">Show Password</label>
                  <input
                    id="showpassword"
                    name="showpassword"
                    type="checkbox"
                    onClick={handleShowPassword}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <button type="submit" id="submit" className="btn-wrap lw">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordTokenPage;
