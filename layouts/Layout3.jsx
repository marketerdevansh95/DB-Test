"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Layout3 = (props) => {
  const { data, slug } = props;

  const Schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: JSON.parse(data)?.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Brand",
        name: item.name,
        url: `https://discoveringbrands.com/${slug}/${item.path}`,
        image: item.image,
        // description: item.description1,
      },
    })),
  };

  const handleClick = async (event) => {
    var target = event.target.closest(".item");
    target.classList.add("click");
  };

  return (
    <>
      <div className="layout-3">
        {JSON.parse(data).map((item, index) => {
          return (
            <div
              key={index}
              className="item"
              onClick={(event) => handleClick(event)}
            >
              <Link prefetch={false} href={`/${slug}/${item.path}`}>
                <div className="item-image">
                  <Image
                    className="img-fluid"
                    priority
                    width={200}
                    height={200}
                    quality={50}
                    alt={item.name}
                    src={item.image}
                    placeholder="blur"
                    blurDataURL=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgSURBVHgB7cohAQAADAIw/v518RABgWR6R0PgEVrsRAEp7gPo2hoKGAAAAABJRU5ErkJggg=="
                  />
                </div>
              </Link>
              <Link prefetch={false} href={`/${slug}/${item.path}`}>
                <h3>{item.name}</h3>
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

export default Layout3;
