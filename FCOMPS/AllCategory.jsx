"use client";
import Image from "next/image";
import Link from "next/link";

const AllCategory = (props) => {
  const { categories } = props;
  return (
    <div className="component-wrapper">
      <div className="container-fluid">
        <div className="row">
          {categories.map((item) => {
            return (
              <div className="col-6 col-lg-3" key={item._id}>
                <Link href={`/category/${item.path}`}>
                  <div className="category-wrapper">
                    <div className="cat-image-wrap">
                      <Image
                        className="img-fluid"
                        src={item.categoryImage}
                        alt={item.name}
                        width={500}
                        height={500}
                      />
                    </div>
                    <p>{item.name}</p>
                    <p className="home-cta">View Brands</p>
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

export default AllCategory;
