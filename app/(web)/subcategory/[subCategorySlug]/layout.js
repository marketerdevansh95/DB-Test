import Loader from "@/FCOMPS/Loader";
import { getSubCategoryMeta } from "@/functions/meta-functions";
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
  const subCategorySlug = (await params).subCategorySlug;
  const meta = await getSubCategoryMeta(subCategorySlug);

  if (meta.error) {
    title = "Discovering Brands";
    description =
      "Discovering Brands is a B2B company that provides a platform for stores to list and showcase their products to a wider audience";
  } else {
    title = meta.metaTitle;
    description = meta.metaDescription;
  }

  return {
    title: title,
    description: description,
  };
}


