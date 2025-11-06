import Loader from "@/FCOMPS/Loader";
import React, { Suspense } from "react";
import "@/styles/product.css";
import { getProductMeta } from "@/functions/meta-functions";

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
//   const { productHandle, brandName } = await params;
//   const meta = await getProductMeta(brandName, productHandle);
//   console.log(meta);
//   if (meta.error) {
//     title = "404 | Not Found | Discovering Brands";
//     description =
//       "Discover a wide range of Product Category online at affordable prices. Experience high-quality Product Type that meets your needs. Shop now and enjoy exceptional value with Discovering Brands";
//   } else {
//     const catarrString = response.product.brand.category
//       .map((item) => item.name)
//       .join(", ");
//     title = `Buy ${response.product.brand.name} ${response.product.product.title} Online at Best Price`;
//     description = `Shop Online for ${response.product.product.title} at Rs. ${response.product.product.variants[0].price} only in India. Get Best Quality ${catarrString} products by ${response.product.brand.name}. ✓Trusted Brand ✓Fast Delivery ✓Safe & Secure`;
//   }

//   return {
//     title: title,
//     description: description,
//   };
// }

// else if (meta.status == 201) {
//   title = meta.metaTitle;
//   description = meta.metaDecription;
// } else
