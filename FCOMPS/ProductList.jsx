"use client";
import Image from "next/image";
import Link from "next/link";

const ProductList = (props) => {
  const { productList, brandName } = props;

  return (
    <>
      <div className="container margin-top-all">
        <div className="text-center">
          <h1>Products</h1>
        </div>
        <div className="container">
          <div className="row product-container">
            {productList?.map((product) => {
              return (
                <div className="col-12 col-lg-3" key={product.id}>
                  <div className="productCol">
                    <Link
                      prefetch={false}
                      className="productCard"
                      href={`/brand/${brandName}/${product.handle}`}
                    >
                      <div className="product-card">
                        <div>
                          {product.images.length === 0 ? (
                            <>
                              <Image
                                className="img-fluid"
                                src="/brand.jpg"
                                alt="product"
                                width={500}
                                height={500}
                              />
                            </>
                          ) : (
                            <>
                              <div className="product-image">
                                <Image
                                  fill
                                  quality={50}
                                  objectFit="contain"
                                  className="img-fluid"
                                  src={
                                    product.images[0].src.substring(
                                      0,
                                      product.images[0].src.lastIndexOf(".")
                                    ) +
                                    "_500x" +
                                    product.images[0].src.substring(
                                      product.images[0].src.lastIndexOf("."),
                                      product.images[0].src.length
                                    )
                                  }
                                  alt="product"
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <div className="product-content">
                          <p>{product.title}</p>
                          <p>₹ {product.variants[0].price}</p>
                          <p className="product-btn">View Product</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
