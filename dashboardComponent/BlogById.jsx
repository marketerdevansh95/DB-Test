"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BlogById = (props) => {
  const { data } = props;
  const id = data[0]._id;
  const [name, setName] = useState(data[0].name);
  const [path, setPath] = useState(data[0].path);
  const [image, setImage] = useState(data[0].image);
  const [order, setOrder] = useState(data[0].order);
  const [active, setActive] = useState(data[0].active);
  const [tags, setTags] = useState(data[0].tags);
  const [description1, setDescription1] = useState(data[0].description1);
  const [description2, setDescription2] = useState(data[0].description2);
  const [metaTitle, setMetaTitle] = useState(data[0].metaTitle);
  const [metaDescription, setMetaDescription] = useState(
    data[0].metaDescription
  );
  const [brand, setBrand] = useState(data[0].brand);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [brandList, setBrandList] = useState([]);


  const handleBrandDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleSelect = (id) => {
    if (brand.includes(id)) {
      setBrand(brand.filter((item) => item !== id));
    } else {
      setBrand([...brand, id]);
    }
  };

  const getAllBrand = async () => {
    await fetch(
      `${process.env.BASE_URL}/api/brand-routes/b/get-all-brand-for-blog`
    )
      .then((res) => res.json())
      .then((data) => {
        setBrandList(data.data);
      });
  };

  const handleUpdatePage = async (e) => {
    e.preventDefault();
    const data = {
      name,
      path,
      image,
      description1,
      description2,
      order,
      active,
      tags,
      metaTitle,
      metaDescription,
      brand,
    };
    await fetch(
      `${process.env.BASE_URL}/api/blog-routes/b/blog-find-and-update/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status === 201) {
          window.location.href = "/admin/blog";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllBrand();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container wrapper">
            <div className="row">
              <div className="wrapper-top">
                <h1>Update Blog</h1>
                <Link href={"/admin/blog"}>Cancel</Link>
              </div>
            </div>
            <form onSubmit={(e) => handleUpdatePage(e)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="page">Blog Name</label>
                    <input
                      type="text"
                      name="page"
                      id="page"
                      placeholder="Enter Sub Category Name"
                      className="form-control"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setPath(
                          e.target.value.toLowerCase().replaceAll(" ", "-")
                        );
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label id="path-label" htmlFor="path">
                      Blog Path
                    </label>
                    <input
                      type="text"
                      name="path"
                      id="path"
                      placeholder="Enter Page Path"
                      className="form-control"
                      value={path}
                      onChange={(e) => {
                        setPath(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label id="path-label" htmlFor="path">
                      Blog Active
                    </label>
                    <input
                      type="text"
                      name="path"
                      id="path"
                      placeholder="Enter Category Path"
                      className="form-control"
                      value={active}
                      onChange={(e) => {
                        setActive(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label id="path-label" htmlFor="path">
                      Blog Order
                    </label>
                    <input
                      type="text"
                      name="path"
                      id="path"
                      placeholder="Enter Category Path"
                      className="form-control"
                      value={order}
                      onChange={(e) => {
                        setOrder(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label id="path-label" htmlFor="path">
                      Blog Tags
                    </label>
                    <input
                      type="text"
                      name="path"
                      id="path"
                      placeholder="Enter Category Path"
                      className="form-control"
                      value={tags}
                      onChange={(e) => {
                        setTags(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <div className="dropdown-container">
                      <p className="form-control" onClick={handleBrandDropdown}>
                        Select Options
                      </p>
                      {dropdownOpen && (
                        <div className="dropdown-content">
                          {brandList.map((data) => {
                            return (
                              <div className="checkbox-group" key={data._id}>
                                <input
                                  type="checkbox"
                                  className=""
                                  id={data._id}
                                  value={data._id}
                                  onChange={() => handleSelect(data._id)}
                                  checked={
                                    brand.indexOf(data._id) != -1 && "checked"
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
                    <label id="imageUrl-label" htmlFor="imageUrl">
                      Page Image URL
                    </label>
                    <input
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      placeholder="Enter Image URL"
                      className="form-control"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="description">Description 1</label>
                    <textarea
                      name="description1"
                      id="description1"
                      className="form-control"
                      placeholder="Enter Category Description"
                      rows={2}
                      value={description1}
                      onChange={(e) => setDescription1(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="description">Description 2</label>
                    <textarea
                      name="description2"
                      id="description2"
                      className="form-control"
                      placeholder="Enter Category Description"
                      rows={2}
                      value={description2}
                      onChange={(e) => setDescription2(e.target.value)}
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
                      placeholder="Enter Meta Title"
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
                      placeholder="Enter Meta Description"
                      rows={2}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
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
        </>
      )}
    </>
  );
};

export default BlogById;
