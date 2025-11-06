"use client";
import Loader from "@/FCOMPS/Loader";
import Link from "next/link";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const MyEditor = dynamic(() => import("@/utils/EditorNew"), { ssr: false });

const CreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    path: "",
    categoryImage: "",
    order: 0,
    description1: "",
    description2: "",
    metaTitle: "",
    metaDescription: "",
  });

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

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/category-routes/b/create-category`,
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

      const data = await response.json();

      if (data.status === 200) {
        window.location.href = "/admin/category";
      } else {
        console.error("Failed to create category:", data.error);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container wrapper">
          <div className="row">
            <div className="wrapper-top">
              <h2>Create Category</h2>
              <Link href={"/admin/category"}>Cancel</Link>
            </div>
          </div>
          <form onSubmit={handleCreate}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="category">Category Name</label>
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
                  <label htmlFor="path">Category Path</label>
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
                  <label htmlFor="imageUrl">Category Image URL</label>
                  <input
                    type="text"
                    name="categoryImage"
                    id="imageUrl"
                    placeholder="Enter Image URL"
                    className="form-control"
                    value={formData.categoryImage}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="description1">Content Top</label>
                  {/* <MyEditor
                    key={`editor-cat-1-${new Date}`}
                    initialContent={formData.description1}
                    onChange={(content) =>
                      setFormData({ ...formData, description1: content })
                    }
                  /> */}
                  <textarea
                    name="metaDescription"
                    id="metaDescription"
                    className="form-control"
                    rows={5}
                    value={formData.description1}
                    onChange={(content) =>
                      setFormData({ ...formData, description1: content })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="description2">Content Bottom</label>
                  <MyEditor
                    key={`editor-cat-2-${new Date()}`}
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

export default CreateCategory;
