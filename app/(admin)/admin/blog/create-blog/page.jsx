"use client";
import Loader from "@/FCOMPS/Loader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import dynamic from "next/dynamic";
const MyEditor = dynamic(() => import("@/utils/EditorNew"), { ssr: false });

const CreatePage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    path: "",
    image: "",
    description1: "",
    description2: "",
    tags: "",
    order: 0,
    active: "Y",
    metaTitle: "",
    metaDescription: "",
    catpath: "",
    blogCategory: "",
  });

  const [blogCatList, setBlogCatList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState({});
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        path: e.target.value
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase(),
      });
    } else if (e.target.name === "path") {
      const sanitizedPath = e.target.value
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toLowerCase();
      setFormData({
        ...formData,
        [e.target.name]: sanitizedPath,
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSuggestionsVisible(true);
  };

  const handleSelect = (blogCategoryId) => {
    setSelectedBlogCategory(blogCategoryId);
    const selectedBlogCat = blogCatList.find(
      (item) => item._id === blogCategoryId
    );
    setInputValue(selectedBlogCat ? selectedBlogCat.name : "");
  };

  const getAllBlogCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/blog-category-routes/b/get-all-blog-category-for-blog`,
        {
          method: "POST",
          cache: "no-cache",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog categories");
      }
      const data = await response.json();
      setBlogCatList(data.data);
    } catch (error) {
      console.error("Error fetching blog categories:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    formData.blogCategory = selectedBlogCategory;
    const selectedBlogCat = blogCatList.find(
      (brand) => brand._id === selectedBlogCategory
    );
    formData.catpath = selectedBlogCat ? selectedBlogCat.path : "";

    const emptyFields = [];
    for (const key in formData) {
      if (
        key !== "description2" &&
        key !== "catpath" &&
        key !== "tags" &&
        key !== "order"
      ) {
        if (formData.hasOwnProperty(key) && !formData[key]) {
          emptyFields.push(key);
        }
      }
    }

    if (emptyFields.length > 0) {
      emptyFields.forEach((field) => {
        toast.error(`${field} cannot be empty.`);
      });
      return;
    }

    setLoading(true);
    // console.log(formData);

    // return;

    try {
      const createData = await fetch(
        `${process.env.BASE_URL}/api/blog-routes/b/create-blog`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!createData.ok) {
        return new Error();
      }

      const result = await createData.json();

      if (result.status === 200) {
        window.location.href = "/admin/blog";
      } else {
        return new Error();
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogCategory();
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".suggestion-container")) {
        setSuggestionsVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keyup", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.addEventListener("keyup", handleOutsideClick);
    };
  }, []);

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
              <h1>Create Blog</h1>
              <Link href={"/admin/blog"}>Cancel</Link>
            </div>
          </div>
          <form onSubmit={handleCreate}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">
                    Name<sup className="imp">*</sup>
                  </label>
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
                    Active<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="active"
                    id="active"
                    className="form-control"
                    value={formData.active}
                    onChange={handleChange}
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
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label id="path-label" htmlFor="path">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    placeholder="Please Enter comma seprated values"
                    className="form-control"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="brand">
                    Blog Category<sup className="imp">*</sup>
                  </label>
                  <div className="suggestion-container">
                    <input
                      type="text"
                      className="form-control"
                      id="blogCategory"
                      value={inputValue}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      placeholder="Select Options"
                    />
                    {suggestionsVisible && (
                      <div className="suggestion-content">
                        {blogCatList.map((data) => (
                          <div className="checkbox-group" key={data._id}>
                            <input
                              type="radio"
                              className=""
                              id={data._id}
                              value={data._id}
                              onChange={() => handleSelect(data._id)}
                              checked={selectedBlogCategory === data._id}
                            />
                            <label htmlFor={data._id}>{data.name}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="imageUrl">
                    Image URL<sup className="imp">*</sup>
                  </label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    className="form-control"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="description1">
                    Blog Content <sup className="imp">*</sup>
                  </label>
                  {/* <MyEditor
                    key={`editor-blog-1-${new Date}`}
                    initialContent={formData.description1}
                    onChange={(content) =>
                      setFormData({ ...formData, description1: content })
                    }
                  /> */}

                  <MyEditor
                    initialContent={formData.description1}
                    onChange={(content) =>
                      setFormData((prev) => ({
                        ...prev,
                        description1: content,
                      }))
                    }
                  />
                </div>
              </div>
              {/* <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="description1">
                    Content Bottom<sup className="imp">*</sup>
                  </label>
                  <MyEditor
                    key={`editor-blog-2-${new Date}`}
                    initialContent={formData.description2}
                    onChange={(content) =>
                      setFormData({ ...formData, description2: content })
                    }
                  />
                </div>
              </div> */}

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
                  <label htmlFor="metaDescription">
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
                    Create
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
