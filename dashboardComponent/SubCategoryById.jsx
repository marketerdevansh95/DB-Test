"use client";
import Loader from "@/FCOMPS/Loader";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import MyEditor from "@/utils/EditorNew";

const SubCategoryById = (props) => {
  const { data } = props;
  const id = data._id;
  const [name, setName] = useState(data.name);
  const [path, setPath] = useState(data.path);
  const [subCategoryImage, setSubCategoryImage] = useState(
    data.subCategoryImage
  );
  const [order, setOrder] = useState(data.order || 0);
  const [description1, setDescription1] = useState(data.description1 || "");
  const [description2, setDescription2] = useState(data.description2 || "");
  const [metaTitle, setMetaTitle] = useState(data.metaTitle);
  const [metaDescription, setMetaDescription] = useState(
    data.metaDescription
  );
  const [parents, setParents] = useState(data.parents || []);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const suggestionRef = useRef(null);

  const handleSelect = (categoryId) => {
    if (parents.includes(categoryId)) {
      setParents(parents.filter((item) => item !== categoryId));
    } else {
      setParents([...parents, categoryId]);
    }
  };

  const getAllCategory = async () => {
    await fetch(`${process.env.BASE_URL}/api/category-routes/b/get-all-category`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryList(data.data || []);
      });
  };

  useEffect(() => {
    if (categoryList.length > 0) {
      const selectedNames = categoryList
        .filter((c) => parents.includes(c._id))
        .map((c) => c.name)
        .join(", ");
      setInputValue(selectedNames);
    }
  }, [categoryList, parents]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setSuggestionsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUpdateSubCategory = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      path,
      subCategoryImage,
      order: Number(order),
      description1,
      description2,
      metaTitle,
      metaDescription,
      parents,
    };
    try {
      const res = await fetch(
        `${process.env.BASE_URL}/api/subcategory-routes/b/subcategory-find-and-update-by-id/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const json = await res.json();
      if (res.ok && json.status === 200) {
        window.location.href = "/admin/subcategory";
      } else {
        console.log(json);
      }
    } catch (error) {
      console.log(error);
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
          <div className="container wrapper">
            <div className="row">
              <div className="wrapper-top">
                <h1>Update Sub Category</h1>
                <Link href={"/admin/subcategory"}>Cancel</Link>
              </div>
            </div>
            <form onSubmit={(e) => handleUpdateSubCategory(e)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label id="sub-category-label" htmlFor="sub-category">
                      Sub Category Name
                    </label>
                    <input
                      type="text"
                      name="sub-category"
                      id="sub-category"
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
                      Sub Category Path
                    </label>
                    <input
                      type="text"
                      name="path"
                      id="path"
                     placeholder="Enter Subcategory Path"
                      className="form-control"
                      value={path}
                     required
                     onChange={(e) => setPath(e.target.value)}
                    />
                  </div>
                </div>
              
              <div className="col-md-6">
                <div className="form-group">
                  <label id="category-label" htmlFor="category">
                    Parent Categories
                  </label>
                  <div className="suggestion-container" ref={suggestionRef}>
                    <input
                      type="text"
                      className="form-control"
                      id="parentCategories"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        setSuggestionsVisible(true);
                      }}
                      onFocus={() => setSuggestionsVisible(true)}
                      placeholder="Select Options"
                      readOnly
                    />
                    {suggestionsVisible && (
                      <div className="suggestion-content">
                        {categoryList.map((cat) => (
                          <div className="checkbox-group" key={cat._id}>
                            <input
                              type="checkbox"
                              className=""
                              id={cat._id}
                              value={cat._id}
                              onChange={() => handleSelect(cat._id)}
                              checked={parents.indexOf(cat._id) !== -1}
                            />
                            <label htmlFor={cat._id}>{cat.name}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label id="imageUrl-label" htmlFor="imageUrl">
                    SubCategory Image URL
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    placeholder="Enter Image URL"
                    className="form-control"
                    value={subCategoryImage}
                    onChange={(e) => setSubCategoryImage(e.target.value)}
                    required
                  />
                </div>
              </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="order">Order</label>
                  <input
                    type="number"
                    name="order"
                    id="order"
                    className="form-control"
                    value={order}
                    required
                    onChange={(e) => setOrder(e.target.value)}
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
                    rows={3}
                    value={description1}
                    onChange={(e) => setDescription1(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="description2">Content Bottom</label>
                  <MyEditor
                    key={`editor-cat-2`}
                    initialContent={description2}
                    onChange={(content) => setDescription2(content)}
                  />
                </div>
              </div>
              {/* <div className="col-md-12">
                <div className="form-group">
                  <label id="description-label" htmlFor="description2">
                    Description Bottom
                  </label>
                  <textarea
                    name="description2"
                    id="description2"
                    className="form-control"
                    rows={3}
                    value={description2}
                    onChange={(e) => setDescription2(e.target.value)}
                  ></textarea>
                </div>
              </div> */}

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
                  <label id="meta-description-label" htmlFor="meta-description">
                    Meta Description
                  </label>
                  <textarea
                    name="meta-description"
                    id="meta-description"
                    className="form-control"
                    placeholder="Enter Category Meta Description"
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
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
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default SubCategoryById;
