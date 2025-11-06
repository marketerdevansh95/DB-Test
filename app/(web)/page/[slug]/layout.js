import Loader from "@/FCOMPS/Loader";
import { Suspense } from "react";
import { getPageMeta } from "@/functions/meta-functions";

const layout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
};

export default layout;

export async function generateMetadata({ params }) {
  let title, description;
  const { slug } = await params;
  const meta = await getPageMeta(slug);

  if (meta.error) {
    title = "Discovering Brands";
    description =
      "Discovering Brands is a B2B company that provides a platform for stores to list and showcase their products to a wider audience";
  } else {
    title = meta.metaTitle || "Discovering Brands";
    description =
      meta.metaDescription ||
      "Discovering Brands is a B2B company that provides a platform for stores to list and showcase their products to a wider audience";
  }

  return {
    title: title,
    description: description,
  };
}
