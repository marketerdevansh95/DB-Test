"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const MyEditor = dynamic(() => import("@/utils/EditorNew"), { ssr: false });

const CategoryById = (props) => {
  const { data } = props;
  // console.log("ff",data)
  const id = data._id;
  const [name, setName] = useState(data.name);
  const [path, setPath] = useState(data.path);
  const [categoryImage, setCategoryImage] = useState(data.categoryImage);
  const [order, setOrder] = useState(data.order);
  const [description1, setDescription1] = useState(data.description1);
  const [description2, setDescription2] = useState(data.description2);
  const [metaTitle, setMetaTitle] = useState(data.metaTitle);
  const [metaDescription, setMetaDescription] = useState(data.metaDescription);
  const [inputValue, setInputValue] = useState("");
  const [parentList, setParentList] = useState([]);
  const [formData, setFormData] = useState({ parents: [] });
  const [originalParents, setOriginalParents] = useState([]);
  const suggestionRef = useRef(null);

  const [allSubcategories, setAllSubcategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);


  const getAllSubCategories = async () => {
    const res = await fetch(
      `${process.env.BASE_URL}/api/subcategory-routes/b/get-all-subcategories`
    )
      .then((res) => res.json())
      .then((json) => json.data || []);
    setParentList(res);
  };

  const getAllSelectedSubcategories = async () => {
    try {
      const res = await fetch(
        `${process.env.BASE_URL}/api/subcategory-routes/b/get-subcategories-by-category/${id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          cache: "no-store",
        }
      );
      const json = await res.json();
      const selected = json.data || [];
      const selectedIds = selected.map((s) => s._id);
      setFormData({ parents: selectedIds });
      setOriginalParents(selectedIds);
      const selectedNames = selected.map((s) => s.name).join(", ");
      setInputValue(selectedNames);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllSubCategories();
    getAllSelectedSubcategories();
  }, []);

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

  

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    const data = {
      name,
      path,
      categoryImage,
      order,
      description1,
      description2,
      metaTitle,
      metaDescription,
    };
    const res_update = await fetch(
      `${process.env.BASE_URL}/api/category-routes/b/category-find-and-update-by-id/${id}`,
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
        // console.log(data);
        return data;
      });
    if (res_update.status === 200) {
      // Compare original vs updated selected subcategories
      const sortedOriginal = [...originalParents].sort();
      const sortedUpdated = [...formData.parents].sort();
      const changed =
        sortedOriginal.length !== sortedUpdated.length ||
        sortedOriginal.some((val, idx) => val !== sortedUpdated[idx]);

      if (changed) {
        try {
          const resMap = await fetch(
            `${process.env.BASE_URL}/api/subcategory-routes/b/update-category-subcategories/${id}`,
            {
              method: "PATCH",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({ subcategoryIds: formData.parents }),
              cache: "no-store",
            }
          );
          const mapJson = await resMap.json();
          if (!resMap.ok || mapJson.status !== 200) {
            console.log("Failed updating category subcategories", mapJson);
          }
        } catch (err) {
          console.log(err);
        }
      }
      window.location.href = "/admin/category";
    } else {
      console.log(res_update);
    }
  };

  return (
    <>
      <div className="container wrapper">
        <div className="row">
          <div className="wrapper-top">
            <h2>Edit Category</h2>
            <Link href={"/admin/category"}>Cancel</Link>
          </div>
        </div>
        <form onSubmit={(e) => handleUpdateCategory(e)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label id="category-label" htmlFor="category">
                  Category Name
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter Category Name"
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
                  Category Path
                </label>
                <input
                  type="text"
                  name="path"
                  id="path"
                  placeholder="Enter Category Path"
                  className="form-control"
                  value={path}
                  required
                  onChange={(e) => setPath(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="brandcount">Order</label>
                <input
                  type="text"
                  name="brandcount"
                  id="brandcount"
                  className="form-control"
                  value={order}
                  required
                  onChange={(e) => setOrder(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label id="imageUrl-label" htmlFor="imageUrl">
                  Category Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  placeholder="Enter Image URL"
                  className="form-control"
                  value={categoryImage}
                  onChange={(e) => setCategoryImage(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="brand">
                     Sub Categories<sup className="imp">*</sup>
                  </label>
                  <div className="suggestion-container" ref={suggestionRef}>
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
                              checked={formData.parents.indexOf(data._id) !== -1}
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
                <label id="description-label" htmlFor="description1">
                  Description Top
                </label>
                {/* <MyEditor
                  key={`editor-cat-1-${new Date}`}
                  initialContent={description1}
                  onChange={(content) => setDescription1(content)}
                /> */}
                <textarea
                  name="metaDescription"
                  id="metaDescription"
                  className="form-control"
                  rows={5}
                  value={description1}
                  onChange={(content) => setDescription1(content)}
                ></textarea>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label id="description-label" htmlFor="description2">
                  Description Bottom
                </label>
                <MyEditor
                  key={`editor-cat-2-${new Date()}`}
                  initialContent={description2}
                  onChange={(content) => setDescription2(content)}
                />
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
                <label id="metaDescription-label" htmlFor="metaDescription">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  id="metaDescription"
                  className="form-control"
                  placeholder="Enter Brand Description...."
                  rows={5}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                ></textarea>
              </div>
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
  );
};

export default CategoryById;
