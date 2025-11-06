"use client";
import Loader from "@/FCOMPS/Loader";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/FCOMPS/ConfirmationModal";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesWarning";


const MyEditor = dynamic(() => import("@/utils/EditorNew"), {
  ssr: false,
});


const CreateCategory = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState("");
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { showConfirmModal, confirmLeave, cancelLeave } = useUnsavedChangesWarning({
    name,
    path,
    content,
    metaTitle,
    metaDescription,
    image,
    active,
    order
  });


  // const [duplicatePath, setDuplicatePath] = useState(false);
  // const onCloseModal = () => {
  //   setDuplicatePath(false);
  // }
  const handleCreate = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      name,
      path,
      content,
      metaTitle,
      metaDescription,
      image,
      active,
      order
    };
    const checkRes = await fetch("/api/page-routes/b/check-path", {
      method: "POST",
      body: JSON.stringify({ path }),
      headers: { "Content-Type": "application/json" },
    });
    const checkData = await checkRes.json();

    if (checkData.exists) {
      setLoading(false);
      toast.error("Page path already exists. Please choose another path name.");
      return;
    }

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
      toast.success("Page created successfully!");
      router.push("/admin/custom-pages");
    } else {
      toast.error("Failed to create page. Please try again.");
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <ConfirmationModal
            isOpen={showConfirmModal}
            onConfirm={confirmLeave}
            onCancel={cancelLeave}
            title="Unsaved Changes"
            message="You have unsaved changes that will be lost if you leave this page. Are you sure you want to continue?"
          />
          {/* {duplicatePath && (<PathExistsModal onClose = {onCloseModal} />)} */}
          <div className="component-wrapper">
            <div className="container">
              <div className="row">
                <div className="wrapper-top">
                  <h2>Create Page</h2>
                  <Link href={"/admin/custom-pages"}>Cancel</Link>
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
          <ToastContainer position="top-right" autoClose={2000} />
        </>
      )}
    </>
  );
};

export default CreateCategory;
