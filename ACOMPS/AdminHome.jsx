import Link from "next/link";
import React from "react";

const AdminHome = (props) => {
  const { data } = props;
  return (
    <div className="wrapper-a">
      <div className="block">
        <Link href="/admin/brand" prefetch={false}>
          <p>
            <span>Brands</span> - {data.brand}
          </p>
        </Link>
        <Link href="/admin/category" prefetch={false}>
          <p>
            <span>Categories</span> - {data.category}
          </p>
        </Link>
        <Link href="/admin/blog" prefetch={false}>
          <p>
            <span>Blog</span> - {data.blog}
          </p>
        </Link>
        <Link href="/admin/blog-category" prefetch={false}>
          <p>
            <span>Blog Category</span> - {data.blogCategory}
          </p>
        </Link>
        <Link href="/admin/query" prefetch={false}>
          <p>
            <span>Query</span> - {data.query}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
