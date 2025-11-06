"use client";
import Image from "next/image";
import Link from "next/link";

const AllBlogCategory = (props) => {
  const { blogCategory } = props;

  return (
    <div className="component-wrapper">
      <div className="row">
        {blogCategory.map((item) => {
          return (
            <div className="col-4" key={item._id}>
              <Link prefetch={false} href={`/blog/${item.path}`}>
                <div className="bc-wrapper">
                  <div className="bc-image">
                    <Image
                      className="img-fluid"
                      width={500}
                      height={300}
                      alt={item.name}
                      src={item.image}
                    />
                  </div>
                  <h2>{item.name}</h2>
                  <p className="home-cta"> View Blogs</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBlogCategory;
