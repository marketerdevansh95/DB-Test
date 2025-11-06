"use client";
import Loader from "@/FCOMPS/Loader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import dynamic from "next/dynamic";
const MyEditor = dynamic(() => import("@/utils/EditorNew"), { ssr: false });

const UpdateBlog = ({ params }) => {
  const { id } = params;
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
    blogCategory: "",
  });

  const [blogCategoryList, setBlogCategoryList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSuggestionsVisible(true);
  };

  const handleSelect = (blogCatId) => {
    setSelectedBlogCategory(blogCatId);
    const selectedBlogCat = blogCategoryList.find(
      (item) => item._id === blogCatId
    );
    setInputValue(selectedBlogCat ? selectedBlogCat.name : "");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    formData.blogCategory = selectedBlogCategory;
    const selectedBlogCat = blogCategoryList.find(
      (item) => item._id === selectedBlogCategory
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

    try {
      const updateData = await fetch(
        `${process.env.BASE_URL}/api/blog-routes/b/blog-find-and-update/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const result = await updateData.json();

      if (result.status === 200) {
        window.location.href = "/admin/blog";
      } else {
        return new Error();
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
    setLoading(false);
  };

  const getBlogCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/blog-category-routes/b/get-all-blog-category-for-blog`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog categories");
      }
      const data = await response.json();
      setBlogCategoryList(data.data);
    } catch (error) {
      console.error("Error fetching blog categories:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/blog-routes/b/get-blog-by-id/${id}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data for ID ${id}`);
      }

      const result = await response.json();
      // console.log(result);

      setFormData({
        name: result.data.name,
        path: result.data.path,
        image: result.data.image,
        description1: result.data.description1,
        description2: result.data.description2,
        tags: result.data.tags,
        order: result.data.order,
        active: result.data.active,
        metaTitle: result.data.metaTitle,
        metaDescription: result.data.metaDescription,
        catpath: result.data.catpath,
        blogCategory: result.data.blogCategory,
      });
      setSelectedBlogCategory(result.data.blogCategory);
      const selectedBlogCat = blogCategoryList.find(
        (item) => item._id === result.data.blogCategory
      );
      setInputValue(selectedBlogCat ? selectedBlogCat.name : "");
    } catch (error) {
      setFormData({
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
      toast.error("Error getting data refresh again");
    }
    setLoading(false);
  };

  useEffect(() => {
    getBlogCategories();
  }, []);

  useEffect(() => {
    if (blogCategoryList.length > 0) {
      fetchData();
    }
  }, [id, blogCategoryList]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".suggestion-container")) {
        setSuggestionsVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keyup", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keyup", handleOutsideClick);
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
              <h1>Update Blog</h1>
              <Link href={"/admin/blog"}>Cancel</Link>
            </div>
          </div>
          <form onSubmit={handleUpdate}>
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
                    className="form-control"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="blog-category">
                    Blog Category<sup className="imp">*</sup>
                  </label>
                  <div className="suggestion-container">
                    <input
                      type="text"
                      className="form-control"
                      id="blog-category"
                      value={inputValue}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      placeholder="Select Options"
                    />
                    {suggestionsVisible && (
                      <div className="suggestion-content">
                        {blogCategoryList.map((data) => (
                          <div className="checkbox-group" key={data._id}>
                            <input
                              type="radio"
                              className=""
                              id={data._id}
                              value={data._id}
                              onChange={() => handleSelect(data._id)}
                              checked={selectedBlogCategory.includes(data._id)}
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
                    Blog Content<sup className="imp">*</sup>
                  </label>
                  <MyEditor
                    // key={`blog-editor1-${formData.description1}`}
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
                  <label htmlFor="description2">
                    Content Bottom<sup className="imp">*</sup>
                  </label>
                  <MyEditor
                    key={`editor2-${formData.description2}`}
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

export default UpdateBlog;
