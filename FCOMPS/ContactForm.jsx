"use client";
import React, { useState, useEffect } from "react";

const ContactForm = ({ category }) => {
  const [businessCategoryList, setBusinessCategoryList] = useState([]);

  useEffect(() => {
    if (category?.categoryString) {
      try {
        const parsed = JSON.parse(category.categoryString);
        setBusinessCategoryList(Array.isArray(parsed) ? parsed : []);
      } catch {
        setBusinessCategoryList([]);
      }
    }
  }, [category]);

  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    businessCateogry: "",
    email: "",
    contact: "",
    website: "",
    message: "",
  });

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Sanitization helper ---
  const sanitize = (str) => {
    if (!str) return "";
    return str
      .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
      .replace(/['";`]/g, "") // Remove SQL/XSS risky chars
      .replace(/--/g, "") // Remove SQL comment syntax
      .trim();
  };

  // --- Validation helpers ---
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError(""); // clear error on change
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    // Sanitize all values
    const cleanData = {
      name: sanitize(formData.name),
      brandName: sanitize(formData.brandName),
      businessCateogry: sanitize(formData.businessCateogry),
      email: sanitize(formData.email).toLowerCase(),
      contact: sanitize(formData.contact),
      website: sanitize(formData.website),
      message: sanitize(formData.message),
    };

    // Validate before sending
    if (!cleanData.name || cleanData.name.length < 2) return setError("Full Name is required.");
    if (!cleanData.brandName || cleanData.brandName.length < 2) return setError("Brand Name is required.");
    if (!cleanData.businessCateogry) return setError("Please select a Business Category.");
    if (!isValidEmail(cleanData.email)) return setError("Please enter a valid Email address.");
    if (!isValidPhone(cleanData.contact)) return setError("Contact Number must be 10 digits.");
    if (!isValidUrl(cleanData.website)) return setError("Please enter a valid Website URL.");
    if (!cleanData.message || cleanData.message.length < 10) return setError("Message must be at least 10 characters.");

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.BASE_URL}/api/query-routes/submit-query`,
        {
          method: "POST",
          body: JSON.stringify(cleanData),
          headers: { "Content-type": "application/json" },
        }
      );

      if (res.status === 200) {
        setIsSubmitSuccessful(true);
        setFormData({
          name: "",
          brandName: "",
          businessCateogry: "",
          email: "",
          contact: "",
          website: "",
          message: "",
        });
      } else {
        const data = await res.json();
        setError(data?.error || "Failed to submit query, please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isSubmitSuccessful ? (
        <div className="thanks text-center py-5">
          <h1 className="text-success">Thanks For Your Response ✅</h1>
          <p>We will connect with you shortly.</p>
        </div>
      ) : (
        <div className="mt-5">
          <div className="container">
            <div className="row mb-3">
              <div className="contact-form-heading col-12">
                <h1>Want To Register Your Brand With Us?</h1>
              </div>
            </div>

            <div className="row">
              <div className="form-wrap col-12">
                <form id="survey-form" onSubmit={submitHandler}>
                  {error && (
                    <div className="col-12 mb-3">
                      <p className="text-danger">{error}</p>
                    </div>
                  )}

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        name="brandName"
                        className="form-control"
                        value={formData.brandName}
                        onChange={handleChange}
                        placeholder="Brand Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <select
                        name="businessCateogry"
                        className="form-control"
                        value={formData.businessCateogry}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Business Category</option>
                        {Array.isArray(businessCategoryList) &&
                          businessCategoryList.map((cat, idx) => (
                            <option key={idx} value={cat.path || cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Business Email"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="tel"
                        name="contact"
                        className="form-control"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Contact Number"
                        required
                        pattern="^\d{10}$"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="url"
                        name="website"
                        className="form-control"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="Website URL"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <textarea
                        name="message"
                        className="form-control"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="About Your Brand or Business"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        id="submit"
                        className="btn"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
