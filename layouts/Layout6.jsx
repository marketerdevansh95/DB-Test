"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

const Layout6 = (props) => {
  const { data, slug } = props;

  const Schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: JSON.parse(data)?.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `https://discoveringbrands.com/${slug}/${item.catpath}/${item.path}`,
        name: item.name,
        "@type": "Blog",
        // description: item.description1,
        image: item.image,
      },
    })),
  };

  const handleClick = async (event) => {
    var target = event.target.closest(".item");
    target.classList.add("click");
  };

  return (
    <>
      <div className="layout-6">
        {JSON.parse(data).map((item, index) => {
          return (
            <div
              key={index}
              className="item"
              onClick={(event) => handleClick(event)}
            >
              <Link
                prefetch={false}
                href={`/${slug}/${item.catpath}/${item.path}`}
              >
                <div className="item-image">
                  <Image
                    className="img-fluid"
                    priority
                    width={200}
                    height={200}
                    alt={item.name}
                    src={item.image}
                    quality={50}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgSURBVHgB7cohAQAADAIw/v518RABgWR6R0PgEVrsRAEp7gPo2hoKGAAAAABJRU5ErkJggg=="
                  />
                </div>
              </Link>
              <Link
                prefetch={false}
                className="blog-cat"
                href={`/blog/${item.catpath}`}
              >
                {item.catpath.replaceAll("-", " ")}
              </Link>
              <Link
                prefetch={false}
                href={`/${slug}/${item.catpath}/${item.path}`}
              >
                <h3>{item.name}</h3>
              </Link>
              <p style={{display:"none"}}>{formatDate(item.createdAt)}</p>
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

export default Layout6;
