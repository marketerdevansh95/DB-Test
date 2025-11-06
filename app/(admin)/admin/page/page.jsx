"use client";
import Loader from "@/FCOMPS/Loader";
import EditIcon from "@/utils/EditIcon";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const ShowAllPage = () => {
  const [loading, setLoading] = useState(false);
  const [allPage, setAllPage] = useState([]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    const del_res = await fetch(
      `${process.env.BASE_URL}/api/page-routes/b/delete-page/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    if (del_res.status === 200) {
      toast.success("Page Deleted", {
        theme: "colored",
      });
      setAllPage(allPage.filter((item) => item._id != id));
      setLoading(false);
    }
  };

  const includedIds = [
    "65882992ecff8b140145ef0c",
    "6593eb3db2eac73ae88663fc",
    "665565afa6e8492abc5a4e29",
  ];

  const getAllPage = async () => {
    setLoading(true);
    await fetch(`${process.env.BASE_URL}/api/page-routes/b/get-all-page-list/`)
      .then((res) => res.json())
      .then((data) => {
        const filteredPages = data.data.filter((page) =>
          includedIds.includes(page._id)
        );
        setAllPage(filteredPages);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllPage();
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
      <div className="container">
        <div className="row">
          <div className="wrapper-top">
            <div>
              <h1>Page List</h1>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          {allPage.map((page) => {
            return (
              <div className="col-12" key={page._id}>
                <div className="brand-list">
                  <div>{page.name}</div>
                  <div className="brand-actions">
                    <Link href={`/admin/page/${page._id}`} passHref>
                      <EditIcon />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ShowAllPage;
