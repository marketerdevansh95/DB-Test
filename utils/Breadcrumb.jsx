"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div className="wrapp-breadcrumb">
      <ol
        className="cus-breadcrumb"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          className="active"
          itemScope
          itemProp="itemListElement"
          itemType="https://schema.org/ListItem"
        >
          <Link href={"/"} itemProp="item">
            <span itemProp="name">Home</span>
            <meta itemProp="position" content="1" />
          </Link>
        </li>
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses = paths !== href ? `active` : "list";
          let itemLink = link[0] + link.slice(1, link.length);
          return (
            <React.Fragment key={index}>
              {paths !== href ? (
                <li
                  className={itemClasses}
                  itemScope
                  itemProp="itemListElement"
                  itemType="https://schema.org/ListItem"
                >
                  <Link href={href} itemProp="item">
                    <span itemProp="name">{itemLink.replaceAll("-", " ")}</span>
                    <meta itemProp="position" content={index + 2} />
                  </Link>
                </li>
              ) : (
                <li itemProp="name" className={itemClasses}>
                  {itemLink.replaceAll("-", " ")}
                  <meta itemProp="position" content={index + 2} />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
};

export default Breadcrumb;
