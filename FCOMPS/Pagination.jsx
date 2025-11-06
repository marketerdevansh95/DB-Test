"use client";
import React from "react";
import LeftIcon from "@/utils/LeftIcon";
import RightIcon from "@/utils/RightIcon";
import Link from "next/link";

const Pagination = (props) => {
  const { pageNo, prev, prev2, next, next2, totalPages, pageCategory } = props;
  // console.log(totalPages)
  return (
    <>
      <div className="row justify-content-center mb-lg-5 mb-3">
        <div className="pagination">
          {prev2 && (
            <Link href={`/${pageCategory}/${pageNo - 2}`}>
              <LeftIcon />
              <LeftIcon />
            </Link>
          )}
          {prev && (
            <Link href={`/${pageCategory}/${pageNo - 1}`}>
              <LeftIcon />
            </Link>
          )}
          <Link href="#" className="active">
            {pageNo}
          </Link>
          {next && (
            <Link href={`/${pageCategory}/${pageNo + 1}`}>
              <RightIcon />
            </Link>
          )}
          {next2 && (
            <Link href={`/${pageCategory}/${pageNo + 2}`}>
              <RightIcon />
              <RightIcon />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Pagination;
