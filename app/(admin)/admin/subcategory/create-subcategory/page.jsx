"use client";
import Loader from "@/FCOMPS/Loader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const MyEditor = dynamic(() => import("@/utils/EditorNew"), { ssr: false });

const CreateSubcategory = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    parents: [],
    path: "",
    subCategoryImage: "",
    order: 0,
    description1: "",
    description2: "",
    metaTitle: "",
    metaDescription: "",
  });
  const [parentList, setParentList] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [selectedBlogCategory, setSelectedBlogCategory] = useState({});
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSuggestionsVisible(true);
  };
  const handleSelect = (categoryId) => {
    const alreadySelected = formData.parents.includes(categoryId);
    const updatedParents = alreadySelected
      ? formData.parents.filter((id) => id !== categoryId)
      : [...formData.parents, categoryId];
    setFormData({ ...formData, parents: updatedParents });
    const selectedNames = parentList
      .filter((p) => updatedParents.includes(p._id))
      .map((p) => p.name)
      .join(", ");
    setInputValue(selectedNames);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      path:
        name === "name"
          ? value
              .replace(/[^\w\s]/g, "")
              .replace(/\s+/g, "-")
              .toLowerCase()
          : formData.path,
      order: name === "order" ? parseInt(value) || 0 : formData.order,
    });
  };
  const getAllParentCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/category-routes/b/get-all-category-for-brand`,
        {
          method: "POST",
          cache: "no-cache",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog categories");
      }
      const data = await response.json();
      setParentList(data.data);
    } catch (error) {
      console.error("Error fetching blog categories:", error);
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("submit:", formData)
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/subcategory-routes/b/create-subcategory`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      // Redirect on HTTP success; API doesn't include `status` in JSON body
      if (response.ok) {
        window.location.href = "/admin/subcategory";
        return;
      }
      // If not ok, try to read body for error info
      const data = await response.json().catch(() => ({}));
      console.error("Failed to create category:", data.error || response.statusText);
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllParentCategories();
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".suggestion-container")) {
        setSuggestionsVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keyup", handleOutsideClick);
    console.log(inputValue)
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.addEventListener("keyup", handleOutsideClick);
    };
  },[inputValue])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container wrapper">
          <div className="row">
            <div className="wrapper-top">
              <h2>Create Subcategory</h2>
              <Link href={"/admin/subcategory"}>Cancel</Link>
            </div>
          </div>
          <form onSubmit={handleCreate}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="category">SubCategory Name</label>
                  <input
                    type="text"
                    name="name"
                    id="category"
                    placeholder="Enter Category Name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="path">SubCategory Path</label>
                  <input
                    type="text"
                    name="path"
                    id="path"
                    placeholder="Enter Category Path"
                    className="form-control"
                    value={formData.path}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="category-order">Order</label>
                  <input
                    type="text"
                    name="order"
                    id="category-order"
                    value={formData.order}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="imageUrl">SubCategory Image URL</label>
                  <input
                    type="text"
                    name="subCategoryImage"
                    id="imageUrl"
                    placeholder="Enter Image URL"
                    className="form-control"
                    value={formData.subCategoryImage}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="brand">
                    Parent Categories<sup className="imp">*</sup>
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
                        {parentList.map((data) => (
                          <div className="checkbox-group" key={data._id}>
                            <input
                              type="checkbox"
                              className=""
                              id={data._id}
                              value={data._id}
                              onChange={() => handleSelect(data._id)}
                              checked={formData.parents.indexOf(data._id) !== -1 && "checked"}
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
                  <label htmlFor="description1">Content Top</label>
                  {/* <MyEditor
                    key={`editor-cat-1`}
                    initialContent={formData.description1}
                    onChange={(content) =>
                      setFormData({ ...formData, description1: content })
                    }
                  /> */}
                  <textarea
                    name="description1"
                    id="description1"
                    className="form-control"
                    rows={5}
                    value={formData.description1}
                    onChange={(e) =>
                      setFormData({ ...formData, description1: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="description2">Content Bottom</label>
                  <MyEditor
                    key={`editor-cat-2`}
                    initialContent={formData.description2}
                    onChange={(content) =>
                      setFormData({ ...formData, description2: content })
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <h2>Meta Details</h2>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="meta-title">Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    id="meta-title"
                    placeholder="Enter Meta Title"
                    className="form-control"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="meta-description">Meta Description</label>
                  <textarea
                    name="metaDescription"
                    id="meta-description"
                    className="form-control"
                    placeholder="Enter Category Meta Description"
                    rows={2}
                    value={formData.metaDescription}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <button type="submit" id="submit" className="btn-wrap">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateSubcategory;
