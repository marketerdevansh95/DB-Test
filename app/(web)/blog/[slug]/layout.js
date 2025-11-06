import Loader from "@/FCOMPS/Loader";
import { Suspense } from "react";

const layout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
};

export default layout;

// export async function generateMetadata({ params }) {
//   let title, description;
//   const request = await fetch(
//     `${process.env.BASE_URL}/api/blog-category-routes/f/find-blog-category-meta/${params.slug}`,
//     {cache: "no-cache" }
//   );
//   const response = await request.json();

//   if (response.status !== 200) {
//     title = "Best Brands in India | Discovering Brands";
//     description =
//       "We provide the various range of Brands and Products to fulfill your every need!";
//   }

//   title = response.blogCategory.metaTitle;
//   description = response.blogCategory.metaDescription;

//   return {
//     title: title,
//     description: description,
//   };
// }
