"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Menu from "@/utils/Menu";
import SearchComponent from "./SearchComponent";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category-routes/f/get-all-category');
        const data = await response.json();
        if (data.status === 200) {
          setCategories(data.data.slice(0, 8)); // Show top 8 categories
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="nav-wrapper">
        <div className="nav-top">
          <div className="logo">
            <Link href={"/"} prefetch={false}>
              <Image
                className="img-fluid"
                src="/logo-db.svg"
                alt="logo"
                priority
                width={640}
                height={72}
              />
            </Link>
          </div>
          <div className="web-nav">
            <SearchComponent />
            <Link href={"/brands"} prefetch={false}>
              Brands
            </Link>
            <Link href={"/category"} prefetch={false}>
              Category
            </Link>
            <Link href={"/blog"} prefetch={false}>
              Blog
            </Link>
            <Link href={"/contact"} prefetch={false}>
              Contact Us
            </Link>
          </div>
        </div>
        <div className="nav-bottom">
          <div className="hamburger" onClick={toggleMobileMenu}>
            <Menu />
          </div>
          <div className="links">
            <Link href="/category">All Categories</Link>
            {!loading && categories.map((category) => (
              <Link 
                key={category._id}
                href={`/category/${category.path}`}
              >
                {category.name}
              </Link>
            ))}
            {loading && (
              <span className="loading-categories">Loading categories...</span>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "show" : ""}`}>
        <div className="close-menu" onClick={toggleMobileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width={25}
            height={25}
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </div>
        <Link href={"/brands"} prefetch={false} onClick={toggleMobileMenu}>
          Brands
        </Link>
        <Link href={"/category"} prefetch={false} onClick={toggleMobileMenu}>
          Category
        </Link>
        <Link href={"/blog"} prefetch={false} onClick={toggleMobileMenu}>
          Blog
        </Link>
        <Link href={"/search"} prefetch={false} onClick={toggleMobileMenu}>
          Search
        </Link>
        <Link href={"/contact"} prefetch={false} onClick={toggleMobileMenu}>
          Contact
        </Link>
        
        {/* Mobile category submenu */}
        <div className="mobile-categories">
          <h4>Categories</h4>
          {categories.map((category) => (
            <Link 
              key={category._id}
              href={`/category/${category.path}`}
              onClick={toggleMobileMenu}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
