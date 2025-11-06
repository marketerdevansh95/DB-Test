"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Menu from "@/utils/Menu";
import SearchComponent from "./SearchComponent";
import HoverDropdownMenu from "./HoverDropdownMenu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allPage, setAllPage] = useState([]);

  const excludedIds = [
    "65882992ecff8b140145ef0c",
    "6593eb3db2eac73ae88663fc",
    "665565afa6e8492abc5a4e29",
  ];

  const getAllPage = async () => {
    setLoading(true);

    try {
      const cached = localStorage.getItem("allPagesData");
      if (cached) {
        const parsed = JSON.parse(cached);
        const now = new Date().getTime();

        if (now - parsed.timestamp < 24 * 60 * 60 * 1000) {
          setAllPage(parsed.data);
          setLoading(false);
          return;
        }
      }

      const res = await fetch(
        `${process.env.BASE_URL}/api/page-routes/b/get-all-page-list/`
      );
      const data = await res.json();

      const filteredPages = data.data.filter(
        (page) => !excludedIds.includes(page._id)
      );

      setAllPage(filteredPages);

      localStorage.setItem(
        "allPagesData",
        JSON.stringify({
          data: filteredPages,
          timestamp: new Date().getTime(),
        })
      );
    } catch (err) {
      console.error("Error fetching pages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPage();
    console.log(allPage);
  }, []);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
    console.log("hovered");
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

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
            {/* <SearchComponent /> */}
            <Link href={"/brands"} prefetch={false}>
              Brands
            </Link>
            <Link href={"/category"} prefetch={false}>
              Category
            </Link>
            <Link href={"/blog"} prefetch={false}>
              Blog
            </Link>

            <div
              style={{ display: "inline-block", position: "relative" }}
              className=""
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={"/all-pages/1"} prefetch={false}>
                D2C Brands
              </Link>
              {isDropdownVisible && (
                <HoverDropdownMenu loading={loading} allPage={allPage} />
              )}
            </div>
            <Link
              href={"/contact"}
              prefetch={false}
              style={{
                color: "#FFF",
                background: "#000",
                padding: "10px 20px",
                borderRadius: "50px",
              }}
            >
              List Your Brand
            </Link>
          </div>
        </div>
        <div className="nav-bottom">
          <div className="hamburger" onClick={toggleMobileMenu}>
            <Menu />
          </div>
          <div className="links">
            <a href="/category">All Categories</a>
            <a href="/category/fashion">Fashion</a>
            <a href="/category/beauty-personal-care">Beauty</a>
            <a href="/category/sports-outdoors">Sports</a>
            <a href="/category/toys-games">Toys</a>
            <a href="/category/home-kitchen-furniture">home &amp; furniture</a>
            <a href="/category/electronics">Electronics</a>
            <a href="/category/pet-supplies">Pet Supplies</a>
            <a href="/category/industrial-b2b">Industrial &amp; B2B</a>
            <a href="/category/office-professional-supplies">Office Supplies</a>
            <a href="/category/automotive">Automotive</a>
            <a href="/category/grocery-gourmet-foods">Food</a>
          </div>
        </div>
      </header>

      {/* Hamburger icon for mobile */}

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
        <Link href={"/all-pages/1"} prefetch={false}>
          D2C Brands
        </Link>
        <Link href={"/search"} prefetch={false} onClick={toggleMobileMenu}>
          Search
        </Link>
        <Link href={"/contact"} prefetch={false} onClick={toggleMobileMenu}>
          Contact
        </Link>
        <Link
          onMouseEnter={() => {
            console.log("hi");
          }}
          href={"/contact"}
          prefetch={false}
          style={{
            color: "#FFF",
            background: "#000",
            padding: "10px 20px",
            borderRadius: "50px",
          }}
        >
          List Your Brand
        </Link>
      </div>
    </>
  );
};

export default Header;
