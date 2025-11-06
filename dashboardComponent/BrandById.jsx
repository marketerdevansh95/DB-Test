"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BrandById = (props) => {
  const { data } = props;
  const id = data[0]._id;
  const [name, setName] = useState(data[0].name);
  const [path, setPath] = useState(data[0].path);
  const [category, setCategory] = useState(data[0].category);
  const [url, setUrl] = useState(data[0].url);
  const [imageUrl, setImageUrl] = useState(data[0].imageUrl);
  const [description1, setDescription1] = useState(data[0].description1);
  const [description2, setDescription2] = useState(data[0].description2);
  const [tags, setTags] = useState(data[0].tags);
  const [metaTitle, setMetaTitle] = useState(data[0].metaTitle);
  const [metaDescription, setMetaDescription] = useState(
    data[0].metaDescription
  );
  const [order, setOrder] = useState(data[0].order);
  const [insta, setInsta] = useState(data[0].insta);
  const [youtube, setYoutube] = useState(data[0].youtube);
  const [facebook, setFacebook] = useState(data[0].facebook);
  const [twitter, setTwitter] = useState(data[0].twitter);
  const [active, setActive] = useState(data[0].active);
  const [categoryList, setCategoryList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCategoryDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelect = (id) => {
    if (category.includes(id)) {
      const updatedCategoryList = category.filter((item) => item !== id);

      setCategory(updatedCategoryList);
    } else {
      const updatedCategoryList = [...category, id];

      setCategory(updatedCategoryList);
    }
  };

  const getAllCategory = async () => {
    await fetch(
      `${process.env.BASE_URL}/api/category-routes/b/get-all-category`
    )
      .then((res) => res.json())
      .then((data) => {
        setCategoryList(data.data);
      });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      name,
      path,
      category,
      url,
      imageUrl,
      description1,
      description2,
      tags,
      metaTitle,
      metaDescription,
      order,
      insta,
      youtube,
      facebook,
      twitter,
      active,
    };
    const upd_res = await fetch(
      `${process.env.BASE_URL}/api/brand-routes/b/brand-find-and-update/${id}`,
      {
        method: "PATCH",
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
    if (upd_res.status === 200) {
      window.location.href = "/admin/brand";
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <>
      <div className="container wrapper">
        <div className="row">
          <div className="wrapper-top">
            <h2>Create Brand</h2>
            <Link href={"/admin/brand"}>Cancel</Link>
          </div>
        </div>
        <form onSubmit={(e) => handleUpdate(e)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label id="name-label" htmlFor="name">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Enter Brand Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setPath(e.target.value.toLowerCase().replaceAll(" ", "-"));
                  }}
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
                  value={path}
                  required
                  disabled
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
                  name="order"
                  id="order"
                  placeholder="Enter Brand Name"
                  className="form-control"
                  value={active}
                  onChange={(e) => {
                    setActive(e.target.value);
                  }}
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
                                category.indexOf(data._id) != -1 && "checked"
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
                  Brand URL
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  placeholder="Enter Image URL"
                  className="form-control"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label id="imageUrl-label" htmlFor="imageUrl">
                  Image Url
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  placeholder="Enter Image URL"
                  className="form-control"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label id="description-label" htmlFor="description1">
                  Description Top
                </label>
                <textarea
                  name="description1"
                  id="description1"
                  className="form-control"
                  placeholder="Enter Brand Description...."
                  rows={5}
                  value={description1}
                  onChange={(e) => setDescription1(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label id="description-label" htmlFor="description2">
                  Description Bottom
                </label>
                <textarea
                  name="description2"
                  id="description2"
                  className="form-control"
                  placeholder="Enter Brand Description...."
                  rows={5}
                  value={description2}
                  onChange={(e) => setDescription2(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label id="brandUrl-label" htmlFor="brandUrl">
                  Brand Tags
                </label>
                <input
                  type="text"
                  name="brandUrl"
                  id="brandUrl"
                  className="form-control"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  required
                />
              </div>
            </div>
            <br />
            <h2>Meta Details</h2>
            <br />
            <div className="col-md-12">
              <div className="form-group">
                <label id="meta-title-label" htmlFor="meta-title">
                  Brand Meta Title
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
                <label id="meta-description-label" htmlFor="meta-description">
                  Brand Meta Description
                </label>
                <textarea
                  name="meta-description"
                  id="meta-description"
                  className="form-control"
                  rows={5}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
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
                  value={insta}
                  onChange={(e) => {
                    setInsta(e.target.value);
                  }}
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
                  value={youtube}
                  onChange={(e) => {
                    setYoutube(e.target.value);
                  }}
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
                  value={facebook}
                  onChange={(e) => {
                    setFacebook(e.target.value);
                  }}
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
                  value={twitter}
                  onChange={(e) => {
                    setTwitter(e.target.value);
                  }}
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

export default BrandById;
