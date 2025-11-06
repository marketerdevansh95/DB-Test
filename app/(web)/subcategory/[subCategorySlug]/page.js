
import Category from "@/FCOMPS/Category";
import { getSubCategoryAndBrands } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";

export const revalidate = 0;

export default async function SubCategoryPage({ params }) {
  const { subCategorySlug } = await params;
  const data = await getSubCategoryAndBrands(subCategorySlug);
  console.log("data", data);
  return (
    <>
      <Breadcrumb />
      <Category
        categoryDataString={data.subCategoryDataString}
        brandDataString={data.brandDataString}
        showDescription2={false}
      />
    </>
  );
}


