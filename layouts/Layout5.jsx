"use client";
import { formatPrice } from "@/functions/format-price";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Layout5 = (props) => {
  const { data, slug } = props;
  const [temp, setTemp] = useState(JSON.parse(data).products);

  const handleSelect = (event) => {
    console.log(event.target.value);
    if (event.target.value === "1") {
      const sortedTemp = [...temp].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setTemp(sortedTemp);
    } else if (event.target.value === "2") {
      const sortedTemp = [...temp].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      setTemp(sortedTemp);
    } else if (event.target.value === "3") {
      const sortedTemp = [...temp].sort(
        (a, b) =>
          parseFloat(a.variants[0].price) - parseFloat(b.variants[0].price)
      );
      setTemp(sortedTemp);
    } else if (event.target.value === "4") {
      const sortedTemp = [...temp].sort(
        (a, b) =>
          parseFloat(b.variants[0].price) - parseFloat(a.variants[0].price)
      );
      setTemp(sortedTemp);
    }
  };

  useEffect(() => {
  }, [temp]);

  const getRandomValue = (type) => {
    const value = Math.random() * (5 - 1) + 1;
    if (type === "f") {
      return value.toFixed(1);
    } else {
      return Math.round(value);
    }
  };

  const Schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: JSON.parse(data)?.products?.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": `https://discoveringbrands.com/${slug}/${item.handle}`,
        name: item.title,
        image: item.images.length > 0 ? item.images[0].src : null,
        description: item.body_html,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: getRandomValue("f"),
          reviewCount: getRandomValue(),
        },
        offers: {
          "@type": "Offer",
          priceValidUntil: "2030-07-10 15:00:00.000",
          price: item.variants.length > 0 ? item.variants[0].price : null,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: `https://discoveringbrands.com/${slug}/${item.handle}`,
        },
      },
    })),
  };

  const handleClick = async (event) => {
    var target = event.target.closest(".item");
    target.classList.add("click");
    const href = event.target.closest(".item").querySelector('a').getAttribute('href');
    window.location.href = href;
  };

  return (
    <>
      <div className="sort">
        <span>Total {JSON.parse(data).products.length} Products</span>
        <span>
          <p>Sort By : </p>
          <select onChange={(event) => handleSelect(event)}>
            <option value={0}>Select Option</option>
            <option value={1}>Alphabetically ACS</option>
            <option value={2}>Alphabetically DESC</option>
            <option value={3}>Price Low to High</option>
            <option value={4}>Price High to Low</option>
          </select>
        </span>
      </div>
      <div className="layout-5">
        {temp.map((item, index) => {
          return (
            <div
              key={index}
              className="item"
              onClick={(event) => handleClick(event)}
            >
              <Link href={`/${slug}/${item.handle}`}>
                <div className="item-image">
                  {item.images.length === 0 ? (
                    <Image
                      className="img-fluid"
                      src="/brand.jpg"
                      alt="product"
                      width={240}
                      height={240}
                    />
                  ) : (
                    <Image
                      className="img-fluid"
                      src={item.images[0].src}
                      alt={item.title}
                      width={240}
                      height={240}
                      placeholder="blur"
                      blurDataURL=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgSURBVHgB7cohAQAADAIw/v518RABgWR6R0PgEVrsRAEp7gPo2hoKGAAAAABJRU5ErkJggg=="
                    />
                  )}
                </div>
              </Link>
              <Link href={`/${slug}/${item.handle}`}>
                <h3>{item.title}</h3>
                <p>
                  {formatPrice(item.variants[0].price, JSON.parse(data).currency.currency)}
                </p>
                {/* <p>Buy Now</p> */}
              </Link>
            </div>
          );
        })}
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

export default Layout5;
