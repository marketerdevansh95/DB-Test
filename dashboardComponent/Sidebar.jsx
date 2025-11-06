import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="container sidebar-wrapper">
        <div className="row">
            <h3>Menu</h3>
        </div>
        <div className="row">
          <div className="sidebar-links">
            <Link href={"/admin/"}>Home</Link>
            <Link href={"/admin/brand"}>Brand</Link>
            <Link href={"/admin/category"}>Category</Link>
            <Link href={"/admin/subcategory"}>Sub Category</Link>
            <Link href={"/admin/blog"}>Blog</Link>
            <Link href={"/admin/blog-category"}>Blog Category</Link>
            <Link href={"/admin/page"}>Page</Link>
            <Link href={"/admin/meta"}>Meta Data</Link>
            <Link href={"/admin/query"}>Query</Link>
            <Link href={"/admin/subscriber"}>Subscriber</Link>
            <Link href={"/admin/custom-pages"}>Custom Pages</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
