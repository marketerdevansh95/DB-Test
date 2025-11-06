"use client";
import React, { useState, useEffect } from "react";

const HomeSection1 = () => {

  const prefix = "Your Brand.";

  const suffixes = [" Our Spotlight.", " Driving Growth.", " Powering Profits."];

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0); 
  const [subIndex, setSubIndex] = useState(0); 
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === suffixes.length) return;

    const speed = deleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setDisplayedText(suffixes[index].substring(0, subIndex));

      if (!deleting && subIndex === suffixes[index].length) {
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % suffixes.length);
      }

      setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, suffixes]);

  return (
    <section className="brand-section">
      <div className="content-wrapper">
         <h1 className="tagline" aria-label="Your Brand. Centre Stage.">
          {prefix} 
          <br className="sm-only" />
          <span style={{ display: displayedText ? "inline" : "none" }}>{displayedText || "Centre Stage."}</span>
          <span className="cursor"></span>
        </h1>
        <p className="brief">
          Discovering Brands is the platform where D2C brands shine. We help homegrown businesses gain visibility, reach high-intent audiences, and grow their customer base. From curated gifting to lifestyle, wellness, and beyond, we showcase your unique products to the right people.
        </p>
      </div>
      <span className="drop"></span>
    </section>
  );
};

export default HomeSection1;
