import Loader from "@/FCOMPS/Loader";
import { getSingleBlogMeta } from "@/functions/meta-functions";
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
  const blogSlug = (await params).blogSlug;
  let title, description;
  const meta = await getSingleBlogMeta(blogSlug);

  if (!meta) {
    title = "Best Brands in India | Discovering Brands";
    description =
      "We provide the various range of Brands and Products to fulfill your every need!";
  }

  title = meta.metaTitle;
  description = meta.metaDescription;

  return {
    title: title,
    description: description,
  };
}
