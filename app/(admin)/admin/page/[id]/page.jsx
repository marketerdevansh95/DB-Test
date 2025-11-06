import PageById from "@/dashboardComponent/PageById";
import React from "react";

const EditCategory = async ({ params }) => {
  const { id } = params;
  const timestamp = new Date().getTime();
  const data = await fetch(
    `${process.env.BASE_URL}/api/page-routes/b/get-page-by-id/${id}?timestamp=${timestamp}`
  )
    .then((res) => res.json())
    .then((data) => {
      {
        // console.log("f", data);
        return data.data;
      }
    });
  // const data = [singleCategory.data];

  return (
    <>
      <PageById data={data} />
    </>
  );
};

export default EditCategory;

// export async function generateStaticParams() {
//   let categoryData;
//   await fetch(`${process.env.BASE_URL}/api/category-routes/get-all-category`)
//     .then((res) => res.json())
//     .then((data) => {
//       categoryData = data.data;
//     });
//   categoryData = categoryData.filter((item, ind) => ind < 1);
//   return categoryData.map((item) => ({
//     id: item._id,
//   }));
// }
