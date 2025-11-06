"use client";
import Loader from "@/FCOMPS/Loader";
import EditIcon from "@/utils/EditIcon";
import DeleteIcon from "@/utils/DeleteIcon";
import DeleteModal from "@/dashboardComponent/DeleteModal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const ShowAllPage = () => {
  const [loading, setLoading] = useState(false);
  const [allPage, setAllPage] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const handleConfirmDelete = async (e, id) => {
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
    setSelectedItemId(null);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    setSelectedItemId(id);
  };
  const handleCancelDelete = () => {
    setSelectedItemId(null);
  };
  // const handleDelete = async (e, id) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const del_res = await fetch(
  //     `${process.env.BASE_URL}/api/page-routes/b/delete-page/${id}`,
  //     {
  //       method: "DELETE",
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       return data;
  //     });
  //   if (del_res.status === 200) {
  //     toast.success("Page Deleted", {
  //       theme: "colored",
  //     });
  //     setAllPage(allPage.filter((item) => item._id != id));
  //     setLoading(false);
  //   }
  // };

  const excludedIds = [
    "65882992ecff8b140145ef0c",
    "6593eb3db2eac73ae88663fc",
    "665565afa6e8492abc5a4e29",
  ];

  const getAllPage = async () => {
    setLoading(true);
    await fetch(`${process.env.BASE_URL}/api/page-routes/b/get-all-page-list/`)
      .then((res) => res.json())
      .then((data) => {
        const filteredPages = data.data.filter(
          (page) => !excludedIds.includes(page._id)
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
      {selectedItemId && (
        <DeleteModal
          onConfirm={(e) => handleConfirmDelete(e, selectedItemId)}
          onCancel={handleCancelDelete}
        />
      )}
      <div className="container">
        <div className="row">
          <div className="wrapper-top2">
            <div>
              <h1>Cutom Pages</h1>
            </div>
            <Link href={"/admin/custom-pages/create-page"}>
              <button className="create-btn">Create Page</button>
            </Link>
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
                    <Link href={`/admin/custom-pages/${page._id}`} passHref>
                      <EditIcon />
                    </Link>
                    <Link
                      href={"#"}
                      passHref
                      onClick={(e) => handleDelete(e, page._id)}
                    >
                      <DeleteIcon />
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
