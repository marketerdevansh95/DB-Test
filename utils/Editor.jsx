"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import beautify from "js-beautify";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function MyEditorOld({ initialContent, onChange }) {
  const [htmlContent, setHtmlContent] = useState(initialContent || "");
  const [editorContent, setEditorContent] = useState(htmlContent);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const formattedContent = beautify.html(initialContent || "", {
      indent_size: 2,
      space_in_empty_paren: true,
    });
    setHtmlContent(formattedContent);
    setEditorContent(initialContent || "");
  }, [initialContent]);

  const handleHtmlChange = (event) => {
    const { value } = event.target;
    setHtmlContent(value);
    setEditorContent(value);
    onChange(value);
  };

  const handleEditorChange = (newContent) => {
    const formattedContent = beautify.html(newContent, {
      indent_size: 2,
      space_in_empty_paren: true,
    });
    setEditorContent(newContent);
    setHtmlContent(formattedContent);
    onChange(newContent);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <p
        style={{
          padding: "5px 10px",
          margin: "10px",
          border: "1px solid",
          borderRadius: "5px",
          width: "fit-content",
          cursor: "pointer",
          fontSize : "14px"
        }}
        onClick={toggleEditMode}
      >
        {isEditing ? "HTML" : "Editor"}
      </p>
      {isEditing ? (
        <QuillEditor
          className="custom-editor"
          value={editorContent}
          onChange={handleEditorChange}
        />
      ) : (
        <textarea
          value={htmlContent}
          onChange={handleHtmlChange}
          style={{ width: "100%", height: "300px" }}
        />
      )}
    </div>
  );
}
