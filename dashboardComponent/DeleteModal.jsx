"use client";
import React from "react";

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-wrapper">
      <div className="delete-modal">
        <h2>Are you sure you want to delete this item?</h2>
        <br />
        <div className="modal-buttons">
          <button className="btn-wrap" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-wrap delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
