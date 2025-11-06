"use client";
import DataCardComponent from "@/FCOMPS/DataCardComponent";
import Loader from "@/FCOMPS/Loader";
import React, { useEffect, useState } from "react";

const SearchAppPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const fetchData = async (val) => {
        try {
          // if (val === "") {
          //   setSearchData([]);
          //   return;
          // }

          // setLoading(true);
          const response = await fetch(
            `${process.env.BASE_URL}/api/brand-routes/f/get-all-brands-search/${
              val === "" ? "all" : val
            }`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          setSearchData(data.data);
        } catch (error) {
          setError(true);
          console.error(error);
        } finally {
          // setLoading(false);
        }
      };

      fetchData(searchTerm);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  if (error) {
    return new Error();
  }

  return (
    <div className="component-wrapper">
      <div className="container">
        <div className="row">
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for Categories or Brands..."
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <DataCardComponent
          title={false}
          cta_text="View All"
          cta_url="/brands"
          slug="brand"
          data={JSON.stringify(searchData)}
          layout={3}
        />
      </div>
    </div>
  );
};

export default SearchAppPage;