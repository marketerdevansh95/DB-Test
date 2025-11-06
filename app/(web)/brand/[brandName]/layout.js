import Loader from "@/FCOMPS/Loader";
import { getBrandMeta } from "@/functions/meta-functions";
import { Suspense } from "react";

const layout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
};

export default layout;

export async function generateMetadata({ params }) {
  const brandName = (await params).brandName;
  let title, description;
  const meta = await getBrandMeta(brandName);

  if (!meta) {
    title = "404 | Not Found | Discovering Brands";
    description =
      "We provide the various range of Brands and Products to fulfill your every need!";
  } else {
    title = meta.metaTitle;
    description = meta.metaDescription;
  }

  return {
    title: title,
    description: description,
  };
}
