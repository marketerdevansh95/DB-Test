"use client";
import Link from "next/link";
import React from "react";
import { FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer-wrapper">
      <div className="footer-cta">
        <h2>Join Discovering Brands Today</h2>
        <p>Showcase your products to high-intent buyers and grow your business.</p>
        <div className="footer-social">
          <Link prefetch={false} href="https://www.linkedin.com/in/discovering-brands-49b01b389/" target="_blank" aria-label="LinkedIn">
            <FiLinkedin size={24} />
          </Link>
          <Link prefetch={false} href="https://www.instagram.com/discovering.brands" target="_blank" aria-label="Instagram">
            <FiInstagram size={24} />
          </Link>
          <Link prefetch={false} href="mailto:info@discoveringbrands.com" aria-label="Email">
            <FiMail size={24} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <p>
            © Copyright {currentYear} <Link prefetch={false} href={"/"}>Discovering Brands</Link>.
            All rights reserved
          </p>
        </div>
        <div>
          <ul>
            <li>
              <Link href="/page/privacy-policy" prefetch={false}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/page/terms-and-conditions" prefetch={false}>
                Terms And Conditions
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" prefetch={false}>
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
