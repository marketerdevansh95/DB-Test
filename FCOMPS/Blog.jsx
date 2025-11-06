"use client";

import Image from "next/image";
import Link from "next/link";

const Blog = (props) => {
  const { blogString } = props;
  const blog = JSON.parse(blogString);
  const blogTags = blog.tags.split(",");
  return (
    <div className="component-wrapper blog-wrap">
      <div className="container">
        <h1 className="text-center">{blog.name}</h1>
        <div
          className="row mt-2 mb-4"
          style={{ position: "relative", height: "500px" }}
        >
          <Image
            src={blog.image}
            alt={blog.name}
            fill={true}
            objectFit="contain"
          />
        </div>
        <div className="row blog-content">
          <div
            className="col=12"
            dangerouslySetInnerHTML={{ __html: blog.description1 }}
          />
          <div
            className="col=12"
            dangerouslySetInnerHTML={{ __html: blog.description2 }}
          />
        </div>
        <div className="row">
          <div className="blog-tags">
            {blogTags.map((item, index) => {
              return item.trim() !== "" ? (
                <Link key={index}
                  href={`/blog/tagged-by/${item
                    .trim()
                    .replaceAll(" ", "-")
                    .toLowerCase()}`}
                >
                  {item.trim()}
                </Link>
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
