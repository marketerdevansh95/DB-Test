"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const FeaturedBrandSpotlight = () => {
  return (
    <div className="featured-brand-spotlight">
      <div className="spotlight-container">
        <div className="spotlight-image">
          <Image
            src="/placeholder-brand.jpg"
            alt="Featured Brand"
            width={600}
            height={400}
            className="spotlight-img"
            style={{ borderRadius: "12px" }}
          />
        </div>
        <div className="spotlight-content">
          <div className="brand-badge">Brand of the Week</div>
          <h2 className="spotlight-heading">Featured Brand Spotlight</h2>
          <h3 className="brand-name">Artisan Essentials</h3>
          <h4 className="brand-subheading">Handcrafted Wellness & Beauty</h4>
          <p className="brand-description">
            Discover the essence of traditional craftsmanship meets modern wellness. Artisan Essentials brings you carefully curated products that blend ancient wisdom with contemporary science, creating unique formulations that nourish both body and soul. Each product is thoughtfully designed to elevate your daily self-care routine.
          </p>
          <div className="brand-info">
            <div className="info-box">
              <span className="info-label">Founded Year</span>
              <span className="info-value">2019</span>
            </div>
            <div className="info-box">
              <span className="info-label">Products</span>
              <span className="info-value">50+</span>
            </div>
            <div className="info-box">
              <span className="info-label">Location</span>
              <span className="info-value">India</span>
            </div>
          </div>
          <Link href="/brands/artisan-essentials" className="cta-button">
            Explore This Brand
            <svg className="cta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBrandSpotlight;