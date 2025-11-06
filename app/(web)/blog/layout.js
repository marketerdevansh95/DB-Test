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

// export async function generateMetadata() {
//   let title, description;

//   try {
//     const request = await fetch(
//       `${process.env.BASE_URL}/api/meta-routes/f/get-blog-meta`,
//       {cache: "no-cache" }
//     );
//     const response = await request.json();

//     if (response.status != 200) {
//       title = "404 | Not Found | Discovering Brands";
//       description =
//         "Discovering Brands is a B2B company that provides a platform for stores to list and showcase their products to a wider audience";
//     } else {
//       title = response.data[0].blogMetaTitle;
//       description = response.data[0].blogMetaDescription;
//     }

//     return {
//       title: title,
//       description: description,
//     };
//   } catch (error) {
//     return {
//       title: "Discovering Brands",
//       description:
//         "Discovering Brands is a B2B company that provides a platform for stores to list and showcase their products to a wider audience",
//     };
//   }
// }
