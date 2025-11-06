import DataCardComponent from "@/FCOMPS/DataCardComponent";
import { allCategoryData } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";

// Enable ISR with 60 seconds revalidation for category listings
export const revalidate = 0;

export default async function AllCategoryPage() {
  const data = await allCategoryData();
  return (
    <>
      <Breadcrumb />
      <DataCardComponent
        title={false}
        cta_text={false}
        cta_url="/category"
        slug="category"
        data={data.categoryString}
        layout={4}
        content=""
        heading="Categories"
      />
    </>
  );
}
