"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/FCOMPS/Loader";
import { ToastContainer, toast, Bounce } from "react-toastify";

const EditPage = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    path: "",
    image: "",
    order: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/blog-category-routes/b/blog-category-find-and-update/${id}`,
        {
          method: "PATCH",
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
      toast.error("Error updating the data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/api/blog-category-routes/b/get-blog-category-by-id/${id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data for ID ${id}`);
        }

        const result = await response.json();

        setFormData({
          name: result.data.name,
          path: result.data.path,
          image: result.data.image,
          order: result.data.order,
          description: result.data.description,
          metaTitle: result.data.metaTitle,
          metaDescription: result.data.metaDescription,
        });
      } catch (error) {
        setFormData({
          name: "",
          path: "",
          image: "",
          order: "",
          description: "",
          metaTitle: "",
          metaDescription: "",
        });
        toast.error("Error getting data refresh again");
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
              <h1>Update Blog Category</h1>
              <Link href={"/admin/blog-category"}>Cancel</Link>
            </div>
          </div>
          <form onSubmit={(e) => handleUpdate(e)}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="page">
                    Name<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="page"
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
                    id="order"
                    className="form-control"
                    value={formData.order}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label id="imageUrl-label" htmlFor="imageUrl">
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
                  <label id="meta-title-label" htmlFor="meta-title">
                    Meta Title<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    id="meta-title"
                    className="form-control"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label id="meta-description-label" htmlFor="meta-description">
                    Meta Description<sup className="imp">*</sup>
                  </label>
                  <textarea
                    name="metaDescription"
                    id="meta-description"
                    className="form-control"
                    rows={5}
                    value={formData.metaDescription}
                    onChange={handleChange}
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

export default EditPage;
