"use client";
import Loader from "@/FCOMPS/Loader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import dynamic from "next/dynamic";
const MyEditor = dynamic(() => import("@/utils/EditorNew"), { ssr: false });

const CreateBrand = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    path: "",
    category: [],
    active: "Y",
    order: 0,
    url: "",
    imageUrl: "",
    description1: "",
    description2: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    insta: "",
    youtube: "",
    facebook: "",
    twitter: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelect = (id) => {
    setFormData((prevData) => {
      if (prevData.category.includes(id)) {
        return {
          ...prevData,
          category: prevData.category.filter((item) => item !== id),
        };
      } else {
        return {
          ...prevData,
          category: [...prevData.category, id],
        };
      }
    });
  };

  const getAllCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/category-routes/b/get-all-category-for-brand`,
        {
          method: "POST",
          cache: "no-cache",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category data");
      }
      const data = await response.json();
      setCategoryList(data.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
      toast.error("Failed to fetch category data");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.category.length === 0) {
        throw new Error("Please select at least one category");
      }

      const createResponse = await fetch(
        `${process.env.BASE_URL}/api/brand-routes/b/create-brand`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!createResponse.ok) {
        throw new Error("Failed to create brand");
      }

      const createData = await createResponse.json();

      if (createData.status === 200) {
        toast.success("Brand Created Successfully", {
          theme: "colored",
        });
        window.location.href = "/admin/brand";
      } else {
        throw new Error("Failed to create brand");
      }
    } catch (error) {
      console.error("Error creating brand:", error);
      toast.error("Failed to create brand. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
          <div className="container wrapper">
            <div className="row">
              <div className="wrapper-top">
                <h1>Create Brand</h1>
                <Link href={"/admin/brand"}>Cancel</Link>
              </div>
            </div>
            <form onSubmit={handleCreate}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Brand Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="path">Path</label>
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
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="active">Active</label>
                    <input
                      type="text"
                      name="active"
                      id="active"
                      className="form-control"
                      value={formData.active}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="order">Order</label>
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
                    <label htmlFor="category">Category</label>
                    <div className="dropdown-container">
                      <p
                        className="form-control"
                        onClick={handleCategoryDropdown}
                      >
                        Select Options
                      </p>
                      {dropdownOpen && (
                        <div className="dropdown-content">
                          {categoryList.map((data) => {
                            return (
                              <div className="checkbox-group" key={data._id}>
                                <input
                                  type="checkbox"
                                  className=""
                                  id={data._id}
                                  value={data._id}
                                  onChange={() => handleSelect(data._id)}
                                  checked={formData.category.includes(data._id)}
                                />
                                <label htmlFor={data._id}>{data.name}</label>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="url">Brand Store URL</label>
                    <input
                      type="text"
                      name="url"
                      id="url"
                      className="form-control"
                      value={formData.url}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="imageUrl">Brand Logo URL</label>
                    <input
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      className="form-control"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="description1">Brief Description</label>
                    <textarea
                      name="description1"
                      id="description1"
                      className="form-control"
                      rows={5}
                      value={formData.description1}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="description2">Detailed Description</label>
                    <MyEditor
                      key={`editor-brand-${new Date()}`}
                      initialContent={formData.description2}
                      onChange={(content) =>
                        setFormData({ ...formData, description2: content })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="tags">Brand Tags</label>
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      className="form-control"
                      value={formData.tags}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <h2>Meta Details</h2>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="metaTitle">Meta Title</label>
                    <input
                      type="text"
                      name="metaTitle"
                      id="metaTitle"
                      className="form-control"
                      value={formData.metaTitle}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="metaDescription">Meta Description</label>
                    <textarea
                      name="metaDescription"
                      id="metaDescription"
                      className="form-control"
                      rows={5}
                      value={formData.metaDescription}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="insta">Instagram Link</label>
                    <input
                      type="text"
                      name="insta"
                      id="insta"
                      className="form-control"
                      value={formData.insta}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="youtube">Youtube Link</label>
                    <input
                      type="text"
                      name="youtube"
                      id="youtube"
                      className="form-control"
                      value={formData.youtube}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="facebook">Facebook Link</label>
                    <input
                      type="text"
                      name="facebook"
                      id="facebook"
                      className="form-control"
                      value={formData.facebook}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="twitter">Twitter Link</label>
                    <input
                      type="text"
                      name="twitter"
                      id="twitter"
                      className="form-control"
                      value={formData.twitter}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <button type="submit" id="submit" className="btn-wrap">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default CreateBrand;
