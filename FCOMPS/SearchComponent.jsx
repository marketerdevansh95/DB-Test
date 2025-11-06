"use client";
import React, { useEffect, useState, useRef } from "react";
import "@/styles/header-search.css";
import Image from "next/image";
import Link from "next/link";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showPadding, setShowPadding] = useState(false);
  const [heading, setHeading] = useState("Top Searches");
  const searchRef = useRef(null);
  const debounceTimeout = useRef(null);

  const fetchSearchData = async (term) => {
    try {
      const url =
        term.trim() === ""
          ? `${process.env.BASE_URL}/api/brand-routes/f/get-all-brands-search/all`
          : `${process.env.BASE_URL}/api/brand-routes/f/get-all-brands-search/${term}`;

      setHeading(term.trim() === "" ? "Top Searches" : "Top Brands");

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setSearchData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      const topSearches = [
        {
          name: "Boat Lifestyle",
          id: "6581ec74afcb1c431f30e72b",
          path: "boat-lifestyle",
        },
        {
          name: "Paperboatfoods",
          id: "6581ec74afcb1c431f30eae9",
          path: "paperboatfoods",
        },
        {
          name: "Paperboatcollective",
          id: "6581ec74afcb1c431f30eb7c",
          path: "paperboatcollective",
        },
      ];
      setSearchData(topSearches);
    }
  };

  const debounce = (func, delay) => {
    return function (...args) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => func.apply(this, args), delay);
    };
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setShowPadding(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayedSearch = debounce(async (term) => {
      if (term.trim().length >= 4) {
        await fetchSearchData(term);
        setShowPadding(true);
      } else {
        setSearchData([]);
        setShowPadding(false);
      }
    }, 500);

    if (showSearch) {
      delayedSearch(searchTerm);
    } else {
      setSearchData([]);
      setShowPadding(false);
    }

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, showSearch]);

  const closeShow = () => {
    setShowSearch(false);
    setShowPadding(false);
    setSearchTerm("");
  };

  const handleSearchItemClick = () => {
    setShowSearch(false);
    setShowPadding(false);
    setSearchTerm("");
  };

  return (
    <>
      <span
        ref={searchRef}
        className={`header-search-wrapper ${showSearch ? "show" : ""}`}
      >
        <span className="search-icon">
          <Image src="/search.svg" alt="Search Icon" width={18} height={18} />
        </span>
        <input
          type="text"
          placeholder="Search for Categories or Brands"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onFocus={() => setShowSearch(true)}
        />
        <span className="close-icon" onClick={closeShow}>
          <Image src="/close.svg" alt="Close Icon" width={18} height={18} />
        </span>
        <div
          className={`show-content ${showSearch ? "show" : ""}`}
          style={{
            padding: showPadding ? "0 10px" : "0",
            border: showPadding ? "1px solid #000" : "none",
          }}
        >
          {showPadding && <p>{heading}</p>}
          <ul
            style={{
              display: showPadding ? "flex" : "none",
            }}
          >
            {searchData.map((item) => (
              <li key={item.id} onClick={handleSearchItemClick}>
                <Link href={`/brand/${item.path}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </span>
    </>
  );
};

export default SearchComponent;
