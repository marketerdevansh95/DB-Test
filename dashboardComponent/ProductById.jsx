"use client";
import Loader from "@/FCOMPS/Loader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const ProductById = (props) => {
  const { data } = props;
  const id = data[0]._id;
  const [loading, setLoading] = useState(false);
  const [handle, setHandle] = useState(data[0].handle);
  const [metaTitle, setMetaTitle] = useState(data[0].metaTitle);
  const [metaDescription, setMetaDescription] = useState(
    data[0].metaDescription
  );
  const [brand, setBrand] = useState(data[0].brand);
  const [brandList, setBrandList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleBrandDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getAllBrand = async () => {
    await fetch(`${process.env.BASE_URL}/api/brand-routes/get-all-brands`)
      .then((res) => res.json())
      .then((data) => {
        setBrandList(data.data);
      });
  };

  const handleCreateProduct = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      handle,
      brand,
      metaTitle,
      metaDescription,
    };
    if (brand.length <= 0) {
      alert("select brand");
      setLoading(false);
      return;
    }
    await fetch(
      `${process.env.BASE_URL}/api/product-routes/product-find-and-update/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.status === 201) {
        toast.success("Product Updated Successfully", {
          theme: "colored",
        });
        window.location.href = "/admin/product";
      }
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
          <div className="container wrapper">
            <div className="row">
              <div className="wrapper-top">
                <h1>Create Product</h1>
                <Link href={"/admin/product"}>Cancel</Link>
              </div>
            </div>
            <form onSubmit={(e) => handleCreateProduct(e)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="title">Enter Product Title</label>
                    <input
                      type="text"
                      name="producttitle"
                      id="producttitle"
                      className="form-control"
                      value={handle}
                      onChange={(e) => {
                        setHandle(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="brand">Select Brand</label>
                    <div className="dropdown-container">
                      <p className="form-control" onClick={handleBrandDropdown}>
                        Select Brand
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
                                  onChange={() => setBrand(data._id)}
                                  checked={brand.includes(data._id)}
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
                <br />
                <h2>Product Meta Details</h2>
                <br />
                <div className="col-md-12">
                  <div className="form-group">
                    <label id="meta-title-label" htmlFor="meta-title">
                      Enter Product Meta Title
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
                      Enter Product Meta Description
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

                <div className="col-md-12">
                  <button type="submit" id="submit" className="btn-wrap">
                    Submit
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

export default ProductById;
