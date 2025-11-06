"use client";
import Loader from "@/FCOMPS/Loader";
import Link from "next/link";
import React, { useState } from "react";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      name,
      path,
      content,
      metaTitle,
      metaDescription,
    };
    const res = await fetch(
      `${process.env.BASE_URL}/api/page-routes/b/create-page`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    if (res.status === 200) {
      window.location.href = "/admin/page";
    } else {
      // console.log(res);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="component-wrapper">
          <div className="container">
            <div className="row">
              <div className="wrapper-top">
                <h2>Create Page</h2>
                <Link href={"/admin/page"}>Cancel</Link>
              </div>
            </div>
            <form onSubmit={(e) => handleCreate(e)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label id="category-label" htmlFor="category">
                      Page Name
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      className="form-control"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label id="path-label" htmlFor="path">
                      Page Path
                    </label>
                    <input
                      type="text"
                      name="path"
                      id="path"
                      className="form-control"
                      value={path}
                      onChange={(e) => setPath(e.currentTarget.value)}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label id="description-label" htmlFor="content">
                      Page Content
                    </label>
                    <textarea
                      name="content"
                      id="content"
                      className="form-control content"
                      rows="4"
                      cols="50"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-12">
                  <h2>Meta Details</h2>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label id="meta-title-label" htmlFor="meta-title">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="meta-title"
                      id="meta-title"
                      className="form-control"
                      value={metaTitle}
                      onChange={(e) => {
                        setMetaTitle(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label
                      id="meta-description-label"
                      htmlFor="meta-description"
                    >
                      Meta Description
                    </label>
                    <textarea
                      name="meta-description"
                      id="meta-description"
                      className="form-control"
                      rows={2}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                    ></textarea>
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
        </div>
      )}
    </>
  );
};

export default CreateCategory;
