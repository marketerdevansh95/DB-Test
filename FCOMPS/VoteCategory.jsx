"use client";
import Link from "next/link";
import React from "react";

const VoteCategory = (props) => {
  const { data } = props;
  // console.log(JSON.parse(data));
  return (
    <>
      <div className="vote-wrapper">
        <ul>
          {JSON.parse(data).map((el) => {
            return (
              <li key={el.id}>
                <Link href={`/vote/${el.path}`}>{el.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default VoteCategory;
