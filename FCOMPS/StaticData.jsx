"use client";
import React from "react";

const StaticData = (props) => {
  const { pageData } = props;

  return (
    <>
      <hr />
      <div
        className="static-content"
        dangerouslySetInnerHTML={{ __html: pageData }}
      ></div>
    </>
  );
};

export default StaticData;
