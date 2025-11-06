"use client";
import React, { useState } from "react";
import "@/styles/subscriber.css";

const Subscriber = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [thanks, setThanks] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Sanitization helper ---
  const sanitizeInput = (str) => {
    if (!str) return "";
    return str
      .replace(/<\/?[^>]+(>|$)/g, "") // strip HTML tags
      .replace(/['";`]/g, "")         // remove quotes, backticks, semicolons
      .replace(/--/g, "")             // remove SQL comment sequences
      .trim();
  };

  // --- Email Validation ---
  const validateEmail = (email) => {
    const re =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    setError("");
    setSubscribed(false);

    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanMessage = sanitizeInput(message);

    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.BASE_URL}/api/subscriber/f/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail.toLowerCase(),
            message: cleanMessage,
          }),
        }
      );

      const data = await res.json();

      if (data.status === 200) {
        setThanks(true);
        setName("");
        setEmail("");
        setMessage("");
      } else if (data.status === 202) {
        setSubscribed(true);
      } else {
        setError(data.message || "Subscription failed, please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // --- Clear error on typing ---
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (error) setError("");
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (error) setError("");
  };

  return (
    <>
      {thanks ? (
        <div className="sub-wrapper thanks">
          <p>✅ Thanks for Contacting Us!</p>
          <p>Stay tuned for exclusive updates straight to your inbox.</p>
        </div>
      ) : (
        <div className="sub-wrapper">
          <div className="heading">
            <h2>Ask Your Question</h2>
            <p>We will get back to you as soon as possible</p>
          </div>

          <div className="container sub-form">
            <div className="row">
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  disabled={loading}
                  onChange={handleNameChange}
                />
              </div>
              <div className="col-12 col-md-6">
                <input
                  type="email"
                  placeholder="Enter e-mail address"
                  value={email}
                  disabled={loading}
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-12">
                <textarea
                  placeholder="Message (optional)"
                  value={message}
                  disabled={loading}
                  onChange={handleMessageChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                {error && <p className="error">{error}</p>}
                {subscribed && (
                  <p className="error">
                    This email is already registered with us.
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={loading ? "loading" : ""}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Subscriber;
