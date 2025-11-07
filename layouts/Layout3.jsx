"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Layout3 = (props) => {
  const { data, slug } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = JSON.parse(data);

  const Schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items?.map((item, index) => ({
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



  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + items.length) % items.length;
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % items.length;
      // Only reset to initial stage if we've gone through all possible starting positions
      const maxStartIndex = items.length - 6; // Last possible starting position
      if (prevIndex >= maxStartIndex && newIndex === 0) {
        return 0;
      }
      return newIndex;
    });
  };

  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < 6; i++) {
      const index = (currentIndex + i) % items.length;
      visibleItems.push(items[index]);
    }
    return visibleItems;
  };

  return (
    <>
      <div className="layout-3-slider">
        <button className="slider-arrow slider-arrow-prev" onClick={handlePrev}>
          ‹
        </button>
        <div className="slider-container">
          <div 
            className="slider-track"
            style={{ transform: `translateX(-${currentIndex * 16.67}%)` }}
          >
            {items.map((item, index) => {
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
        </div>
        <button className="slider-arrow slider-arrow-next" onClick={handleNext}>
          ›
        </button>
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
