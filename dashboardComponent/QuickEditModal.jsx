"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const MyEditor = dynamic(() => import("@/utils/EditorNew"), { ssr: false });

const QuickEditModal = ({ onUpdate, onCancel, data, isContent }) => {
  const [tempData, setTempData] = useState({
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    content: data.content || "",
  });

  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleSendData = async () => {
    onUpdate(tempData);
  };

  return (
    <div className="modal-wrapper">
      <div className="quick-edit-modal">
        <h2>{data.name}</h2>
        <br />
        <div className="row">
          <div className="col-md-12">
            <h2>Meta Details</h2>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="metaTitle">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                id="metaTitle"
                className="form-control"
                value={tempData.metaTitle}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="metaDescription">Meta Description</label>
              <textarea
                name="metaDescription"
                id="metaDescription"
                className="form-control"
                rows={4}
                value={tempData.metaDescription}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          {isContent && (
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="description2">Detailed Description</label>
                <MyEditor
                  key={`editor-3-${new Date()}`}
                  initialContent={tempData.content}
                  onChange={(data) =>
                    setTempData({ ...tempData, content: data })
                  }
                />
              </div>
            </div>
          )}
        </div>
        <div className="modal-buttons">
          <button className="btn-wrap" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-wrap delete" onClick={handleSendData}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickEditModal;
