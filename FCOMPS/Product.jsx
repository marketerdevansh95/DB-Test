"use client";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { formatPrice } from "@/functions/format-price";

const Product = (props) => {
  const { brandString, productString, currencyString } = props;
  const brand = JSON.parse(brandString),
  product = JSON.parse(productString),
  currency = JSON.parse(currencyString);

  const Schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.body_html,
    sku: product.variants.length > 0 ? product.variants[0].sku : null,
    brand: {
      "@type": "Brand",
      name: product.vendor,
    },
    offers: {
      "@type": "Offer",
      price: product.variants.length > 0 ? product.variants[0].price : null,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `https://discoveringbrands.com/brand/${brand.path}/${product.handle}`,
    },
    image: product.images.length > 0 ? product.images[0].src : null,
    url: `https://discoveringbrands.com/brand/${brand.path}/${product.handle}`,
  };

  return (
    <>
      <div className="product-wrapper">
        <div className="carousel">
          <Carousel
            className="custom-carousel"
            showThumbs={false}
            infiniteLoop={true}
          >
            {product.images.map((image, index) => (
              <Image
                key={index}
                priority
                className="img-fluid"
                objectFit="contains"
                src={
                  image.src.substring(0, image.src.lastIndexOf(".")) +
                  "_500x" +
                  image.src.substring(
                    image.src.lastIndexOf("."),
                    image.src.length
                  )
                }
                // src={image.src}
                width={500}
                height={600}
                alt={product.title}
              />
            ))}
          </Carousel>
        </div>
        <div className="details">
          <h1>{product.title}</h1>
          <p className="price">
            {formatPrice(product?.variants[0].price, currency)}
          </p>
          <p>Product Type : {product.product_type}</p>
          <div className="product_options">
            {product.options[0].name === "Title" ? null : (
              <>
                {product.options.map((option) => (
                  <div key={option.name}>
                    <p>
                      <b>{option.name} :</b> {option.values.length}{" "}
                      {option.name}
                    </p>
                    <select>
                      {option.values.map((value) => (
                        <option key={value}>{value}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </>
            )}
          </div>
          <Link
            className="brand"
            target="_blank"
            href={`${brand.url}?utm_source=discoveringbrands`}
          >
            <Image src="/store.svg" width={20} height={20} alt="store icon" />
            {brand.name}
          </Link>
          <Link
            className="link"
            target="_blank"
            href={`${brand.url}/products/${product.handle}?utm_source=discoveringbrands`}
          >
            Buy Now
          </Link>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(Schema),
        }}
      />
    </>
  );
};

export default Product;
