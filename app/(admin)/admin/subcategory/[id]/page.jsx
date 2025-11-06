import SubCategoryById from "@/dashboardComponent/SubCategoryById";
import React from "react";

const EditSubCategory = async ({ params }) => {
  const { id } = params;
  const timestamp = new Date().getTime();
  const data = await fetch(
    `${process.env.BASE_URL}/api/subcategory-routes/b/get-subcategory-by-id/${id}?timestamp=${timestamp}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    });

  return (
    <>
      <SubCategoryById data={data} />
    </>
  );
};

export default EditSubCategory;
