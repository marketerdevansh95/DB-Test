"use client";
import Loader from "@/FCOMPS/Loader";
import QuickEditModal from "@/dashboardComponent/QuickEditModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const ShowProducts = ({ params }) => {
  const { slug } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quickEditId, setQuickEditId] = useState(null);
  const [quickEditData, setQuickEditData] = useState({});

  const router = useRouter();

  const handleQuickEdit = (e, id) => {
    e.preventDefault();
    setQuickEditId(id);
    setQuickEditData(products.find((item) => item._id === id));
    // console.log("selected id set for quick edit");
  };

  const handleConfirmQuickEdit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/brand-routes/b/quick-edit-product/${quickEditId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      if (response.ok) {
        toast.success("Product Meta Updated Successfully", {
          theme: "colored",
        });

        setProducts((prevProducts) =>
          prevProducts.map((item) =>
            item._id === quickEditId ? { ...item, ...data } : item
          )
        );
      }
      setQuickEditId(null);
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product.");
    }
  };

  const handleCancelQuickEdit = () => {
    setQuickEditId(null);
    setQuickEditData({});
  };

  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/brand-routes/b/get-brand-products/${slug}`
      );
      const result = await response.json();
      setProducts(result.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

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

      {quickEditId && (
        <QuickEditModal
          onUpdate={handleConfirmQuickEdit}
          onCancel={handleCancelQuickEdit}
          data={quickEditData}
          isContent={true}
        />
      )}

      <div className="container wrapper">
        <div className="row">
          <div className="wrapper-top">
            <div>
              <h1>
                <button onClick={() => router.back()} className="back-button">
                  &larr;
                </button>
                Products List
              </h1>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="row wrapper">
          {products.map((item) => (
            <div className="col-12 seprator" key={item._id}>
              <div className="brand-list">
                <div>{item.title}</div>
                <div className="brand-actions">
                  <Link href="#" onClick={(e) => handleQuickEdit(e, item._id)}>
                    Quick Edit
                  </Link>
                </div>
              </div>
              <div className="brand-meta">
                <p>{item.metaTitle}</p>
                <p>{item.metaDescription}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ShowProducts;
