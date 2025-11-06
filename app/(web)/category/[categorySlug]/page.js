import Category from "@/FCOMPS/Category";
import { getCategoryAndBrands } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";

// Enable ISR with 60 seconds revalidation for category pages
export const revalidate = 0;

export default async function CategoryPage({ params }) {
  const { categorySlug } = await params;
  const data = await getCategoryAndBrands(categorySlug);
  return (
    <>
      <Breadcrumb />
      <Category
        categoryDataString={data.categoryDataString}
        brandDataString={data.brandDataString}
      />
    </>
  );
}
