import DataCardComponent from "@/FCOMPS/DataCardComponent";
import { allSubCategoryData } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";

export const revalidate = 0;

export default async function AllSubCategoryPage() {
  const data = await allSubCategoryData();
  return (
    <>
      <Breadcrumb />
      <DataCardComponent
        title={false}
        cta_text={false}
        cta_url="/subcategory"
        slug="subcategory"
        data={data.subcategoryString}
        layout={4}
        content=""
        heading="Subcategories"
      />
    </>
  );
}


