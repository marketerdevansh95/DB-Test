"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/FCOMPS/ConfirmationModal";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesWarning";

const MyEditor = dynamic(() => import("@/utils/EditorNew"), {
  ssr: false,
});

const PageById = (props) => {
  const { data } = props;
  // console.log("ff",data)
  const currentPath = data.path;
  const id = data._id;
  const [name, setName] = useState(data.name);
  const [path, setPath] = useState(data.path);
  const [content, setContent] = useState(data.content);
  const [metaTitle, setMetaTitle] = useState(data.metaTitle);
  const [metaDescription, setMetaDescription] = useState(data.metaDescription);
  const [image, setImage] = useState(data.image);
  const [active, setActive] = useState(data.active);
  const [order, setOrder] = useState(data.order);
  const router = useRouter();

  const {
    showConfirmModal,
    confirmLeave,
    cancelLeave,
  } = useUnsavedChangesWarning({
    name,
    path,
    content,
    metaTitle,
    metaDescription,
    image,
    active,
    order,
  });

  const handleUpdatepage = async (e) => {
    e.preventDefault();
    const data = {
      name,
      path,
      content,
      metaTitle,
      metaDescription,
      image,
      active,
      order,
    };
    const checkRes = await fetch("/api/page-routes/b/check-path", {
      method: "POST",
      body: JSON.stringify({ path }),
      headers: { "Content-Type": "application/json" },
    });
    const checkData = await checkRes.json();

    if (checkData.exists && path !== currentPath) {
      toast.error("Page path already exists. Please choose another path name.");
      return;
    }
    const res_update = await fetch(
      `${process.env.BASE_URL}/api/page-routes/b/page-find-and-update/${id}`,
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
      toast.success("Page Updated successfully!");
      if (props.custom) {
        router.push("/admin/custom-pages");
      } else {
        router.push("/admin/page");
      }
    } else {
      toast.error("Failed to create page. Please try again.");
      console.log(res_update);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showConfirmModal}
        onConfirm={confirmLeave}
        onCancel={cancelLeave}
        title="Unsaved Changes"
        message="You have unsaved changes that will be lost if you leave this page. Are you sure you want to continue?"
      />
      <div className="container wrapper">
        <div className="row">
          <div className="wrapper-top">
            <h2>Edit Page</h2>
            <Link href={props.custom ? "/admin/custom-pages" : "/admin/page"}>
              Cancel
            </Link>
          </div>
        </div>
        <form onSubmit={(e) => handleUpdatepage(e)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label id="page-label" htmlFor="page">
                  Page Name
                </label>
                <input
                  type="text"
                  name="page"
                  id="page"
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
                  required
                  onChange={(e) => setPath(e.target.value)}
                />
              </div>
            </div>
            {/* FOR SETTING PAGE ACTIVE STATUS */}
            <div className="col-md-6">
              <div className="form-group">
                <label id="active-status-label" htmlFor="active-status">
                  Active<sup className="imp">*</sup>
                </label>
                <input
                  type="text"
                  name="Active status"
                  id="active-status"
                  className="form-control"
                  value={active}
                  onChange={(e) => setActive(e.currentTarget.value)}
                  required
                />
              </div>
            </div>
            {/* FOR SETTING PAGE ORDER */}
            <div className="col-md-6">
              <div className="form-group">
                <label id="page-order-label" htmlFor="page-order">
                  Order
                </label>
                <input
                  type="text"
                  name="Page Order"
                  id="page-order"
                  className="form-control"
                  value={order}
                  onChange={(e) => setOrder(e.currentTarget.value)}
                />
              </div>
            </div>
            {/* FOR SETTING BLOG DISPLAY IMAGES */}
            <div className="col-md-12">
              <div className="form-group">
                <label id="display-image-label" htmlFor="dp">
                  Page Display Image
                </label>
                <input
                  type="text"
                  name="Display Image"
                  id="display-image"
                  className="form-control"
                  value={image}
                  onChange={(e) => setImage(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label id="description-label" htmlFor="content">
                  Page Content
                </label>
                <MyEditor
                  initialContent={content}
                  onChange={(content) => setContent(content)}
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
    </>
  );
};

export default PageById;
