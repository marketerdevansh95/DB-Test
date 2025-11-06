"use client";
import React, { useState } from "react";
import Link from "next/link";
import Loader from "@/FCOMPS/Loader";
import { ToastContainer, toast, Bounce } from "react-toastify";

const CreatePage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    path: "",
    image: "",
    description: "",
    order: 0,
    metaTitle: "",
    metaDescription: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Validation checks
    const nameValidation = /^[^\s!@#$%^&*()_+={}\[\]:;<>,.?/~\\]+$/;
    const pathValidation = /^[a-zA-Z0-9-]+$/;

    let error = false;

    if (!nameValidation.test(formData.name.trim())) {
      toast.error("Please Enter a Valid Name");
      error = true;
    }

    if (!pathValidation.test(formData.path)) {
      toast.error(
        "Path can only include alphanumeric characters and hyphen (-)."
      );
      error = true;
    }

    if (error) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/blog-category-routes/b/create-blog-category`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        window.location.href = "/admin/blog-category";
      }
    } catch (error) {
      console.error("Error creating blog category:", error);
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
      {loading ? (
        <Loader />
      ) : (
        <div className="container wrapper">
          <div className="row">
            <div className="wrapper-top">
              <h1>Create Blog Category</h1>
              <Link href={"/admin/blog-category"}>Cancel</Link>
            </div>
          </div>
          <form onSubmit={(e) => handleCreate(e)}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="page-title">
                    Name<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="page-title"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label id="path-label" htmlFor="path">
                    Path<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="path"
                    id="path"
                    className="form-control"
                    value={formData.path}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label id="path-label" htmlFor="path">
                    Order
                  </label>
                  <input
                    type="text"
                    name="order"
                    id="path"
                    className="form-control"
                    value={formData.order}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="imageUrl">
                    Image URL<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="image"
                    id="imageUrl"
                    className="form-control"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="col-md-12">
                <h2>Meta Details</h2>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="metaTitle">
                    Meta Title<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    id="metaTitle"
                    className="form-control"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="meta-description">
                    Meta Description<sup className="imp">*</sup>
                  </label>
                  <textarea
                    name="metaDescription"
                    id="metaDescription"
                    className="form-control"
                    rows={5}
                    value={formData.metaDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <button type="submit" id="submit" className="btn-wrap">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreatePage;
