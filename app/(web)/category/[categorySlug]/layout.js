import Loader from "@/FCOMPS/Loader";
import { getCategoryMeta } from "@/functions/meta-functions";
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
  let title, description;
  const categorySlug = (await params).categorySlug;
  const meta = await getCategoryMeta(categorySlug);

  if (meta.error) {
    title = "Discovering Brands";
    description =
      "Discovering Brands is a B2B company that provides a platform for stores to list and showcase their products to a wider audience";
  }
  title = meta.metaTitle;
  description = meta.metaDescription;

  return {
    title: title,
    description: description,
  };
}
