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

export async function generateMetadata() {
  let title, description;

  try {
    const request = await fetch(
      `${process.env.BASE_URL}/api/meta-routes/f/get-search-meta`,
      {cache: "no-cache" }
    );
    const response = await request.json();
    // console.log(response);
    if (response.status != 200) {
      title = "Discovering Brands";
      description =
        "Discovering Brands is a B2B company that provides a platform for stores to list and showcase their products to a wider audience";
    }

    title = response.data[0].searchMetaTitle;
    description = response.data[0].searchMetaDescription;

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
