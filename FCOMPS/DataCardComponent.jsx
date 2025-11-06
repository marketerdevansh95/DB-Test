"use client";
import React from "react";
import "@/styles/data-component.css";
import Link from "next/link";
import Layout1 from "@/layouts/Layout1";
import Layout2 from "@/layouts/Layout2";
import Layout3 from "@/layouts/Layout3";
import Layout4 from "@/layouts/Layout4";
import Layout5 from "@/layouts/Layout5";
import Layout6 from "@/layouts/Layout6";

const DataCardComponent = (props) => {
  const { heading, title, cta_url, cta_text, slug, data, layout, content } = props;
  return (
    <>
      {heading && <h1 style={{textTransform:"capitalize", textAlign:"center", marginTop:"20px", color: "#000"}}>{heading}</h1>}
      <div className="data-section-wrapper">
        {title && (
          <>
            <div className="heading">
              <h2>{title}</h2>
              <Link prefetch={false} href={cta_url}>{cta_text}</Link>
            </div>
            {content && 
              <p
              className="data-content"
              dangerouslySetInnerHTML={{ __html: content }}
              ></p>
            }
          </>
        )}
        {layout === 1 ? (
          <Layout1 data={data} slug={slug} />
        ) : layout === 2 ? (
          <Layout2 data={data} slug={slug} />
        ) : layout === 3 ? (
          <Layout3 data={data} slug={slug} />
        ) : layout === 4 ? (
          <Layout4 data={data} slug={slug} />
        ) : layout === 5 ? (
          <Layout5 data={data} slug={slug} />
        ) : layout === 6 ? (
          <Layout6 data={data} slug={slug} />
        ) : null}
      </div>
    </>
  );
};

export default DataCardComponent;
