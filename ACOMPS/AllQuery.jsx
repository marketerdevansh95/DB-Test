"use client";
import React, { useState } from "react";
import DeleteModal from "@/dashboardComponent/DeleteModal";
import DeleteIcon from "@/utils/DeleteIcon";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AllQuery = (props) => {
  // Keep initial design’s query parsing but store in state
  const [queries, setQueries] = useState(
    Array.isArray(props.query) ? props.query : JSON.parse(props.query) || []
  );
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = (e, id) => {
    e.preventDefault();
    setSelectedQueryId(id);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedQueryId) return;
    setLoading(true);
    const timestamp = new Date().getTime();

    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/query-routes/delete-query/${selectedQueryId}?timestamp=${timestamp}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (response.status === 200) {
        toast.success("Query Deleted", { theme: "colored" });
        // Update state so UI updates immediately
        setQueries((prev) =>
          prev.filter((item) => item._id !== selectedQueryId)
        );
      } else {
        toast.error(data?.error || "Failed to delete", { theme: "colored" });
      }
    } catch (error) {
      console.error("Error deleting query:", error);
      toast.error("Server error", { theme: "colored" });
    } finally {
      setLoading(false);
      setSelectedQueryId(null);
    }
  };

  const handleCancelDelete = () => {
    setSelectedQueryId(null);
  };

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
      {selectedQueryId && (
        <DeleteModal
          loading={loading}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <div className="container">
        <div className="row">
          <div className="wrapper-top">
            <div>
              <h1>Query List</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {queries.length === 0 ? (
          <div className="col-12">
            <p>No queries found.</p>
          </div>
        ) : (
          queries.map((q) => (
            <div className="col-6" key={q._id}>
              <div className="query-card">
                <div>
                  <h2>{q.name}</h2>
                  <div className="brand-actions">
                    <Link
                      href="#"
                      passHref
                      onClick={(e) => handleDelete(e, q._id)}
                    >
                      <DeleteIcon />
                    </Link>
                  </div>
                </div>
                <div>
                  <p>
                    Created At:{" "}
                    {new Date(q.createdAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    })}
                  </p>
                  <p>Email: {q.email}</p>
                  <p>Brand: {q.brandName}</p>
                  <p>Contact: {q.contact}</p>
                  <p>Business Category: {q.businessCateogry}</p>
                  <p>Website: {q.website}</p>
                  <p>Query: {q.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AllQuery;
