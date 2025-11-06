import CategoryById from "@/dashboardComponent/CategoryById";
import React from "react";

const EditCategory = async ({ params }) => {
  const { id } = params;
  const timestamp = new Date().getTime();
  const data = await fetch(
    `${process.env.BASE_URL}/api/category-routes/b/get-category-by-id/${id}?timestamp=${timestamp}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    });

  return (
    <>
      <CategoryById data={data} />
    </>
  );
};

export default EditCategory;
