"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AllBrands = (props) => {
  const { brands} = props;

  const brandListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: brands.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `https://discoveringbrands.com/brands/${item.path}`,
        name: item.brandName,
        "@type": "Brand",
        description: item.description1,
        image: item.imageUrl,
      },
    })),
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="text-center">
            <h1>Brands</h1>
          </div>
          <div className="container">
            <div className="row">
              {brands.map((item) => {
                return (
                  <div className="col-12 m-lg-3" span="12" key={item.brandId}>
                    <div className="card-new">
                      <div className="row brand_container ">
                        <div className="col-lg-2 p-lg-0 p-0">
                          <Link href={`/brand/${item.path}`} prefetch={false}>
                            <div className="brand_image">
                              <Image
                                className="img-fluid"
                                priority={true}
                                quality={50}
                                src={item.imageUrl}
                                alt={item.brandName}
                                width={500}
                                height={500}
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="col-lg-10">
                          <div className="brand_content">
                            <div className="brand_content_top">
                              <Link
                                href={`/brand/${item.path}`}
                                prefetch={false}
                              >
                                <h2>{item.brandName}</h2>
                              </Link>
                              <div className="brand-categories">
                                {item.categories.map((data) => {
                                  return (
                                    <Link
                                      prefetch={false}
                                      href={`/category/${data.path}`}
                                      key={data.path}
                                    >
                                      {data.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="brand_content_bottom">
                              <p className="d-none d-md-block d-lg-block">
                                {item.description1}
                              </p>
                              <p className="d-block d-md-none d-lg-none">
                                {item.description1.substring(0, 100)}
                                {item.description1.length > 100 ? "..." : ""}
                              </p>
                              <Link
                                href={`/brand/${item.path}`}
                                prefetch={false}
                              >
                                View products
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandListSchema) }}
      />
      
    </>
  );
};

export default AllBrands;
