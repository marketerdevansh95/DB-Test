"use client";
import Loader from "@/FCOMPS/Loader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const UpdateMeta = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    homeMetaTitle: "",
    homeMetaDescription: "",
    brandMetaTitle: "",
    brandMetaDescription: "",
    categoryMetaTitle: "",
    categoryMetaDescription: "",
    blogMetaTitle: "",
    blogMetaDescription: "",
    contactMetaTitle: "",
    contactMetaDescription: "",
    searchMetaTitle: "",
    searchMetaDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const update_response = await fetch(
        `${process.env.BASE_URL}/api/meta-routes/b/update-meta/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!update_response.ok) {
        throw new Error("Failed to update meta data");
      }

      const update_result = await update_response.json();

      if (update_result.status === 200) {
        window.location.reload();
      } else {
        toast.error("Unable to update the meta data");
      }
    } catch (error) {
      console.error("Error updating meta data:", error);
      toast.error("An error occurred while updating meta data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${process.env.BASE_URL}/api/meta-routes/b/get-meta-by-id/${id}`,
          { cache: "no-cache" }
        );

        if (!response.ok) {
          return new Error("Failed to fetch meta data");
        }

        const result = await response.json();
        // console.log("reslut", result);

        if (result.status === 200) {
          setFormData({
            homeMetaTitle: result.data.homeMetaTitle,
            homeMetaDescription: result.data.homeMetaDescription,
            brandMetaTitle: result.data.brandMetaTitle,
            brandMetaDescription: result.data.brandMetaDescription,
            categoryMetaTitle: result.data.categoryMetaTitle,
            categoryMetaDescription: result.data.categoryMetaDescription,
            blogMetaTitle: result.data.blogMetaTitle,
            blogMetaDescription: result.data.blogMetaDescription,
            contactMetaTitle: result.data.contactMetaTitle,
            contactMetaDescription: result.data.contactMetaDescription,
            searchMetaTitle: result.data.searchMetaTitle,
            searchMetaDescription: result.data.searchMetaDescription,
          });
        } else {
          toast.error("Failed to fetch meta data");
          setFormData({
            homeMetaTitle: "",
            homeMetaDescription: "",
            brandMetaTitle: "",
            brandMetaDescription: "",
            categoryMetaTitle: "",
            categoryMetaDescription: "",
            blogMetaTitle: "",
            blogMetaDescription: "",
            contactMetaTitle: "",
            contactMetaDescription: "",
            searchMetaTitle: "",
            searchMetaDescription: "",
          });
        }
      } catch (error) {
        console.error("Error fetching meta data:", error);
        toast.error("An error occurred while fetching meta data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
              <h1>Update Meta Fields</h1>
              <Link href={"/admin/meta"}>Cancel</Link>
            </div>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="row">
              <div className="col-md-12">
                <h2>Home Meta Details</h2>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="homeMetaTitle">
                    Meta Title<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="homeMetaTitle"
                    id="homeMetaTitle"
                    className="form-control"
                    value={formData.homeMetaTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="homeMetaDescription">
                    Meta Description<sup className="imp">*</sup>
                  </label>
                  <textarea
                    name="homeMetaDescription"
                    id="homeMetaDescription"
                    className="form-control"
                    rows={5}
                    value={formData.homeMetaDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="col-md-12">
                <h2>Brand Meta Details</h2>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="brandMetaTitle">
                    Meta Title<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="brandMetaTitle"
                    id="brandMetaTitle"
                    className="form-control"
                    value={formData.brandMetaTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="brandMetaDescription">
                    Meta Description<sup className="imp">*</sup>
                  </label>
                  <textarea
                    name="brandMetaDescription"
                    id="brandMetaDescription"
                    className="form-control"
                    rows={5}
                    value={formData.brandMetaDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="col-md-12">
                <h2>Category Meta Details</h2>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="categoryMetaTitle">
                    Meta Title<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="categoryMetaTitle"
                    id="categoryMetaTitle"
                    className="form-control"
                    value={formData.categoryMetaTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="categoryMetaDescription">
                    Meta Description<sup className="imp">*</sup>
                  </label>
                  <textarea
                    name="categoryMetaDescription"
                    id="categoryMetaDescription"
                    className="form-control"
                    rows={5}
                    value={formData.categoryMetaDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="col-md-12">
                <h2>Blog Meta Details</h2>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="blogMetaTitle">
                    Meta Title<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="blogMetaTitle"
                    id="blogMetaTitle"
                    className="form-control"
                    value={formData.blogMetaTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="blogMetaDescription">
                    Meta Description<sup className="imp">*</sup>
                  </label>
                  <textarea
                    name="blogMetaDescription"
                    id="blogMetaDescription"
                    className="form-control"
                    rows={5}
                    value={formData.blogMetaDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="col-md-12">
                <h2>Contact Meta Details</h2>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="contactMetaTitle">
                    Meta Title<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="contactMetaTitle"
                    id="contactMetaTitle"
                    className="form-control"
                    value={formData.contactMetaTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="contactMetaDescription">
                    Meta Description<sup className="imp">*</sup>
                  </label>
                  <textarea
                    name="contactMetaDescription"
                    id="contactMetaDescription"
                    className="form-control"
                    rows={5}
                    value={formData.contactMetaDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="col-md-12">
                <h2>Search Meta Details</h2>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="searchMetaTitle">
                    Meta Title<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="searchMetaTitle"
                    id="searchMetaTitle"
                    className="form-control"
                    value={formData.searchMetaTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="searchMetaDescription">
                    Meta Description<sup className="imp">*</sup>
                  </label>
                  <textarea
                    name="searchMetaDescription"
                    id="searchMetaDescription"
                    className="form-control"
                    rows={5}
                    value={formData.searchMetaDescription}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <button type="submit" id="submit" className="btn-wrap">
                    Update
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

export default UpdateMeta;
