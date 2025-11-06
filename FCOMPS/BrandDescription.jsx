"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BrandDescription = (props) => {
  const { brandDataString } = props;
  const brand = JSON.parse(brandDataString);
  const links = [
    { url: brand.insta, image: "/insta.svg" },
    { url: brand.twitter, image: "/twitter.svg" },
    { url: brand.facebook, image: "/facebook.svg" },
    { url: brand.youtube, image: "/youtube.svg" },
  ];

  const hasValidLinks = links.some((link) => link.url.trim() !== "");
  const catarrString = brand.category
    .map((item) => `<a href="/category/${item.path}">${item.name}</a>`)
    .join(", ");

  return (
    <>
      <div className="brandDesc-wrapper">
        <div>
          <div className="b-logo">{brand.name.trim()[0]}</div>
          <div className="b-detail">
            <h1>{brand.name}</h1>
            <p>
              <b>Category</b> :{" "}
              <span dangerouslySetInnerHTML={{ __html: catarrString }}></span>
            </p>
            {hasValidLinks && (
              <ul>
                {links.map(
                  (link, index) =>
                    link.url.trim() !== "" && (
                      <li key={index}>
                        <Link href={link.url}>
                          <Image
                            className="img-fluid"
                            width={30}
                            height={30}
                            quality={50}
                            alt={link.url}
                            src={link.image}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgSURBVHgB7cohAQAADAIw/v518RABgWR6R0PgEVrsRAEp7gPo2hoKGAAAAABJRU5ErkJggg=="
                          />
                        </Link>
                      </li>
                    )
                )}
              </ul>
            )}
          </div>
        </div>
        {brand.description1.trim() !== "" && <p>{brand.description1}</p>}
      </div>
    </>
  );
};

export default BrandDescription;
