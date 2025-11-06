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
  const [blog, setBlog] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [prev, setPrev] = useState(true);
  const [next, setNext] = useState(true);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [quickEditId, setQuickEditId] = useState(null);
  const [quickEditData, setQuickEditData] = useState({});

  const handleQuickEdit = (e, id) => {
    e.preventDefault();
    setQuickEditId(id);
    setQuickEditData(blog.find((item) => item._id == id));
    // console.log("selected id set for quick edit");
  };

  const handleConfirmQuickEdit = async (data) => {
    // console.log(data);
    const quick_edit_req = await fetch(
      `${process.env.BASE_URL}/api/blog-routes/b/quick-edit-blog/${quickEditId}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );
    const quick_edit_res = await quick_edit_req.json();

    if (quick_edit_res.status === 200) {
      toast.success("Blog Meta Updated Successfully", {
        theme: "colored",
      });
      setBlog(
        blog.map((item) =>
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

  const handleDelete = (e, id) => {
    e.preventDefault();
    setSelectedItemId(id);
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    const del_res = await fetch(
      `${process.env.BASE_URL}/api/blog-routes/b/delete-blog/${selectedItemId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    if (del_res.status === 200) {
      handleSearch("", 1);
      setLoading(false);
    }
    setSelectedItemId(null);
  };

  const handleCancelDelete = () => {
    setSelectedItemId(null);
  };

  const handleActive = async (e, id) => {
    e.preventDefault();
    const active_res = await fetch(
      `${process.env.BASE_URL}/api/blog-routes/b/make-blog-active/${id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    if (active_res.status === 200) {
      toast.success("Brand Active", {
        theme: "colored",
      });
      setBlog(blog.filter((item) => item._id != id));
    }
  };

  const handleInActive = async (e, id) => {
    e.preventDefault();
    const inactive_res = await fetch(
      `${process.env.BASE_URL}/api/blog-routes/b/make-blog-inactive/${id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    if (inactive_res.status === 200) {
      toast.success("Brand Discarded", {
        theme: "colored",
      });
      setBlog(blog.filter((item) => item._id != id));
    }
  };

  const handleDiscard = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${process.env.BASE_URL}/api/blog-routes/b/get-discarded-blog`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setBlog(data.data);
      });
  };

  const handleSearch = async (e, no) => {
    await fetch(
      `${process.env.BASE_URL}/api/blog-routes/b/get-all-blog/${
        e === "" ? "all" : e
      }&page=${no}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(Math.ceil(data.blog_count / 10));
        setBlog(data.data);
        setPage(no);
      });
  };

  const handleSearchVisiblity = async (slug) => {
    slug == "show" ? setShowSearch(true) : setShowSearch(false);
  };

  const handleReload = async (e) => {
    e.preventDefault();
    window.location.reload();
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

  useEffect(() => {
    setPrev(page - 1 !== 0);
    setNext(page + 1 <= count);
  }, [page, count]);

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

      <div className="container wrapper">
        <div className="row">
          <div className="wrapper-top">
            <div>
              <h1>Blog List</h1>
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
                    onChange={(e) => handleSearch(e.target.value)}
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
                  <Link href={"/admin/blog/create-blog"} passHref>
                    Create
                  </Link>
                </li>
                <li>
                  <Link href={"#"} onClick={(e) => handleDiscard(e)} passHref>
                    Discarded
                  </Link>
                </li>
                <li>
                  <Link href={"#"} onClick={(e) => handleReload(e)} passHref>
                    All
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
          {blog.map((data) => {
            return (
              <div className="col-12" key={data._id}>
                <div className="row cat-wrapper">
                  <div className="brand-list col-12">
                    <div>{data.name}</div>
                    <div className="brand-actions">
                      <Link
                        href={"#"}
                        onClick={(e) => handleQuickEdit(e, data._id)}
                        passHref
                      >
                        Quick Edit
                      </Link>
                      {data.active == "N" ? (
                        <Link
                          href={"#"}
                          passHref
                          onClick={(e) => handleActive(e, data._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.25em"
                            viewBox="0 0 384 512"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                            width={20}
                          >
                            <path
                              fill="#fff"
                              d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                            />
                          </svg>
                        </Link>
                      ) : (
                        <Link
                          href={"#"}
                          passHref
                          onClick={(e) => handleInActive(e, data._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            height="1.5rem"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                            width={20}
                          >
                            <path
                              fill="#fff"
                              d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
                            />
                          </svg>
                        </Link>
                      )}

                      <Link href={`/admin/blog/${data._id}`} passHref>
                        <EditIcon />
                      </Link>
                      <Link
                        passHref
                        href={"#"}
                        onClick={(e) => handleDelete(e, data._id)}
                      >
                        <DeleteIcon />
                      </Link>
                    </div>
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
      <div className="row justify-content-center mb-lg-5 mb-3">
        <div className="pagination pg-admin">
          {prev && (
            <>
              <Link
                href={`blog?page=${parseInt(page) - 1}`}
                onClick={() => handleSearch("", parseInt(page) - 1)}
              >
                {parseInt(page) - 1}
              </Link>
            </>
          )}
          <Link href="javascrrpi:void(0)" className="active">
            {page}
          </Link>
          {next && (
            <>
              <Link
                href={`blog?page=${parseInt(page) + 1}`}
                onClick={() => handleSearch("", parseInt(page) + 1)}
              >
                {parseInt(page) + 1}
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowAllCategory;
