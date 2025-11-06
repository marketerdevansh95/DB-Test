"use client";
import Loader from "@/FCOMPS/Loader";
import DeleteModal from "@/dashboardComponent/DeleteModal";
import QuickEditModal from "@/dashboardComponent/QuickEditModal";
import DeleteIcon from "@/utils/DeleteIcon";
import EditIcon from "@/utils/EditIcon";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const ShowAllCategory = () => {
  const [loading, setLoading] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [quickEditId, setQuickEditId] = useState(null);
  const [quickEditData, setQuickEditData] = useState({});
  const [showSubcatsFor, setShowSubcatsFor] = useState(null);
  const [subcats, setSubcats] = useState([]);

  let prev = true,
    next = true;
  if (page - 1 == 0) {
    prev = false;
  }
  if (page + 1 > count) {
    next = false;
  }

  const handleQuickEdit = (e, id) => {
    e.preventDefault();
    setQuickEditId(id);
    setQuickEditData(allCategory.find((item) => item._id == id));
    // console.log("selected id set for quick edit");
  };

  const handleConfirmQuickEdit = async (data) => {
    // console.log(data);
    const quick_edit_req = await fetch(
      `${process.env.BASE_URL}/api/category-routes/b/quick-edit-category/${quickEditId}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );
    const quick_edit_res = await quick_edit_req.json();

    if (quick_edit_res.status === 200) {
      toast.success("Category Meta Updated Successfully", {
        theme: "colored",
      });
      setAllCategory(
        allCategory.map((item) =>
          item.path === quick_edit_res.data.path
            ? {
                ...item,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
              }
            : item
        )
      );
    }

    setQuickEditId(null);
  };

  const handleCancelQuickEdit = () => {
    setQuickEditId(null);
    setQuickEditData({});
  };
  const handleShowSubCats = async (e, id) => {
    e.preventDefault();
    setShowSubcatsFor(id);
    const res = await fetch(`${process.env.BASE_URL}/api/subcategory-routes/b/get-subcategories-by-category/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      setSubcats(json.data || []);
    } else {
      setSubcats([]);
    }
  }
  const handleCloseSubCats = () => {
    setShowSubcatsFor(null);
    setSubcats([]);
  }
  const handleDelete = (e, id) => {
    e.preventDefault();
    setSelectedItemId(id);
  };

  const handleConfirmDelete = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    const del_res = await fetch(
      `${process.env.BASE_URL}/api/category-routes/b/delete-category/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    if (del_res.status === 200) {
      toast.success("Category Deleted", {
        theme: "colored",
      });
      setAllCategory(allCategory.filter((item) => item._id != id));
      setLoading(false);
    }
    setSelectedItemId(null);
  };

  const handleCancelDelete = () => {
    setSelectedItemId(null);
  };

  const handleSearch = async (e, no) => {
    setLoading(true);
    await fetch(
      `${process.env.BASE_URL}/api/category-routes/b/get-all-category-list/${
        e === "" ? "all" : e
      }&page=${no}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(Math.ceil(data.category_count / 30));
        setAllCategory(data.data);
        setLoading(false);
      });
  };

  const handleSearchVisiblity = async (slug) => {
    slug == "show" ? setShowSearch(true) : setShowSearch(false);
  };

  const handlePaginate = (step) => {
    const inputValue = document.getElementById("search").value;
    if (step == "prev") {
      if (inputValue == "") {
        handleSearch("", page - 1);
        setPage(page - 1);
      } else {
        handleSearch(inputValue, page - 1);
        setPage(page - 1);
      }
    } else if (step == "next") {
      if (inputValue == "") {
        handleSearch("", page + 1);
        setPage(page + 1);
      } else {
        handleSearch(inputValue, page + 1);
        setPage(page + 1);
      }
    }
  };

  useEffect(() => {
    handleSearch("", 1);
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
      {selectedItemId && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {quickEditId && (
        <QuickEditModal
          onUpdate={handleConfirmQuickEdit}
          onCancel={handleCancelQuickEdit}
          data={quickEditData}
        />
      )}

      {/* {showSubcatsFor && (
        <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 300
    }}>
          <div className="modal" style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: 400 
      }}>
            <div className="modal-header">
              <h3>Subcategories</h3>
              <button onClick={handleCloseSubCats}>Close</button>
            </div>
            <div className="modal-body">
              {subcats.length === 0 ? (
                <p>No subcategories found.</p>
              ) : (
                <ul>
                  {subcats.map((s) => (
                    <li key={s._id}>{s.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )} */}

      {showSubcatsFor && (
        <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
      }}>
        <div className="modal-header">
              <h3>Subcategories</h3>
              <button onClick={handleCloseSubCats} style={{
                background: 'none',
                border: 'none',
                color: 'red',
                fontSize: '24px'
              }}>x</button>
            </div>
            <div className="modal-body">
              {subcats.length === 0 ? (
                <p>No subcategories found.</p>
              ) : (
                <ul>
                  {subcats.map((s) => (
                    <li key={s._id}>{s.name}</li>
                  ))}
                </ul>
              )}
        </div>
      </div>
    </div>
      )}

      <div className="container wrapper">
        <div className="row">
          <div className="wrapper-top">
            <div>
              <h1>Category List</h1>
            </div>
            <div className="wrapper-search">
              <ul className="all-search">
                <li className="form-group m-0">
                  <input
                    type="text"
                    id="search"
                    className={`form-control m-0 search ${
                      showSearch ? "searchafter" : ""
                    }`}
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value, 1)}
                  />
                </li>
                <li className="search-icon">
                  {showSearch ? (
                    <span onClick={() => handleSearchVisiblity("hide")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    </span>
                  ) : (
                    <span onClick={() => handleSearchVisiblity("show")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                      </svg>
                    </span>
                  )}
                </li>
                <li>
                  <Link href={"/admin/category/create-category"} passHref>
                    Create
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          {allCategory.map((data) => {
            return (
              <div className="col-12" key={data._id}>
                <div className="brand-list">
                  <div>{data.name}</div>
                  <div className="brand-actions">
                    <Link
                      href={"#"}
                      className="link-button"
                      onClick={(e) => handleShowSubCats(e, data._id)}
                      passHref
                    >
                      Show Subcategories
                    </Link>
                    <Link
                      href={"#"}
                      onClick={(e) => handleQuickEdit(e, data._id)}
                      passHref
                    >
                      Quick Edit
                    </Link>
                    <Link href={`/admin/category/${data._id}`} passHref>
                      <EditIcon />
                    </Link>
                    <Link
                      href={"#"}
                      passHref
                      onClick={(e) => handleDelete(e, data._id)}
                    >
                      <DeleteIcon />
                    </Link>
                  </div>
                </div>
                <div className="brand-meta">
                  <p>{data.metaTitle}</p>
                  <p>{data.metaDescription}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ShowAllCategory;
