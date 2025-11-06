"use client";
import React from "react";

const PageComponent = ({ data }) => {
  return (
    <div className="component-wrapper ckeditor-wrapper">
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
};

export default PageComponent;
