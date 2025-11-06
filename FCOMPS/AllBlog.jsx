"use client";
import Image from "next/image";
import Link from "next/link";

const AllBlogs = (props) => {
  const { blogs, slug } = props;

  return (
    <div className="component-wrapper">
      <div className="container">
        <div className="row">
          <h2 className="text-center">{slug.replaceAll("-", "")}</h2>
        </div>
        <div className="row">
          {blogs.map((item) => {
            return (
              <div className="col-4" key={item._id}>
                <Link href={`/blog/${slug}/${item.path}`}>
                  <div className="blog-card">
                    <Image
                      className="img-fluid"
                      width={300}
                      height={300}
                      src={item.image}
                      alt={item.name}
                      quality={50}
                    />
                    <h2>{item.name}</h2>
                    <p className="home-cta">Read Blog</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
