"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import dynamic from "next/dynamic";
const MyEditor = dynamic(() => import("@/utils/EditorNew"), { ssr: false });

const EditBrand = ({ params }) => {
  const { id } = params;
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
    setDropdownOpen((prevState) => !prevState);
  };

  const handleSelect = (id) => {
    setFormData((prevData) => {
      const isSelected = prevData.category.includes(id);
      return {
        ...prevData,
        category: isSelected
          ? prevData.category.filter((item) => item !== id)
          : [...prevData.category, id],
      };
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/brand-routes/b/brand-find-and-update/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.status === 200) {
        window.location.href = "/admin/brand";
      } else {
        toast.error("Failed to update brand");
      }
    } catch (error) {
      console.error("Error updating brand:", error);
      toast.error("Error updating brand");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Prevent fetch if id is not available

      try {
        const response = await fetch(
          `${
            process.env.BASE_URL
          }/api/brand-routes/b/get-brand-by-id/${id}?timestamp=${new Date().getTime()}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data for ID ${id}`);
        }

        const result = await response.json();
        setFormData({
          name: result.data.name,
          path: result.data.path,
          category: result.data.category,
          active: result.data.active,
          order: result.data.order,
          url: result.data.url,
          imageUrl: result.data.imageUrl,
          description1: result.data.description1,
          description2: result.data.description2,
          tags: result.data.tags,
          metaTitle: result.data.metaTitle,
          metaDescription: result.data.metaDescription,
          insta: result.data.insta,
          youtube: result.data.youtube,
          facebook: result.data.facebook,
          twitter: result.data.twitter,
        });
      } catch (error) {
        setFormData({
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
        toast.error("Failed to fetch brand data. Refresh and try again.");
      }
    };

    fetchData();
    getAllCategory();
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
      <div className="container wrapper">
        <div className="row">
          <div className="wrapper-top">
            <h2>Update Brand</h2>
            <Link href={"/admin/brand"}>Cancel</Link>
          </div>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label id="name-label" htmlFor="name">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="brand"
                  placeholder="Enter Brand Name"
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
                  Path
                </label>
                <input
                  type="text"
                  name="path"
                  id="path"
                  placeholder="Enter Image URL"
                  className="form-control"
                  value={formData.path}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label id="order-label" htmlFor="order">
                  Active
                </label>
                <input
                  type="text"
                  name="active"
                  id="active"
                  placeholder="Enter Brand Name"
                  className="form-control"
                  value={formData.active}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label id="order-label" htmlFor="order">
                  Order
                </label>
                <input
                  type="text"
                  name="order"
                  id="order"
                  placeholder="Enter Brand Name"
                  className="form-control"
                  value={formData.order}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label id="category-label" htmlFor="category">
                  Category
                </label>
                <div className="dropdown-container">
                  <p className="form-control" onClick={handleCategoryDropdown}>
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
                              checked={
                                formData.category.indexOf(data._id) != -1 &&
                                "checked"
                              }
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
                <label id="url-label" htmlFor="url">
                  Brand Store URL
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  placeholder="Enter Image URL"
                  className="form-control"
                  value={formData.url}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label id="imageUrl-label" htmlFor="imageUrl">
                  Brand Logo URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  placeholder="Enter Image URL"
                  className="form-control"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label id="description-label" htmlFor="description1">
                  Brief Description
                </label>
                <textarea
                  name="description1"
                  id="description1"
                  className="form-control"
                  placeholder="Enter Brand Description...."
                  rows={5}
                  value={formData.description1}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label id="description-label" htmlFor="description2">
                  Description Bottom
                </label>
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
                <label id="tags-label" htmlFor="tags">
                  Brand Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  className="form-control"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />
            <h2>Meta Details</h2>
            <br />
            <div className="col-md-12">
              <div className="form-group">
                <label id="metaTitle-label" htmlFor="metaTitle">
                  Brand Meta Title
                </label>
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
                <label id="meta-description-label" htmlFor="meta-description">
                  Brand Meta Description
                </label>
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
            <br />
            <h2>Social Media Links</h2>
            <br />
            <div className="col-md-6">
              <div className="form-group">
                <label id="insta-label" htmlFor="insta">
                  Instagram Link
                </label>
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
                <label id="youtube-label" htmlFor="youtube">
                  Youtube Link
                </label>
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
                <label id="facebook-label" htmlFor="facebook">
                  Facebook Link
                </label>
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
                <label id="twitter-label" htmlFor="twitter">
                  Twitter Link
                </label>
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBrand;
