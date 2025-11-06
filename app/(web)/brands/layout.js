import Loader from "@/FCOMPS/Loader";
import { getBrandsMetaData } from "@/functions/meta-functions";
import { Suspense } from "react";

const layout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
};

export default layout;

export async function generateMetadata() {
  let title, description;

  try {
    const response = await getBrandsMetaData();
    if (response.error) {
      title = "Discovering Brands";
      description =
        "Discovering Brands is a B2B company that provides a platform for stores to list and showcase their products to a wider audience";
    }

    title = response[0].brandMetaTitle;
    description = response[0].brandMetaDescription;
    return {
      title: title,
      description: description,
    };
  } catch (error) {
    return {
      title: "Discovering Brands",
      description:
        "Discovering Brands is a B2B company that provides a platform for stores to list and showcase their products to a wider audience",
    };
  }
}
