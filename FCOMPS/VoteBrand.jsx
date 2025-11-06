"use client";
import Image from "next/image";
import React from "react";

const VoteBrand = (props) => {
  const { data } = props;
//   console.log(data);
  return (
    <>
      <div className="vote-wrapper">
        <ul>
          {JSON.parse(data).map((el) => {
            return <li key={el.path}>{el.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default VoteBrand;
