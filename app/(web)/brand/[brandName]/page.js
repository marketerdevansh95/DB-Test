import BrandDescription from "@/FCOMPS/BrandDescription";
import DataCardComponent from "@/FCOMPS/DataCardComponent";
import { getBrandAndProducts, getSimilarBrands } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";

// Enable ISR with 60 seconds revalidation for brand pages
export const revalidate = 0;

export default async function BrandProductList({ params }) {
  const brandName = (await params).brandName;

  const data = await getBrandAndProducts(brandName);
  const similarBrands = await getSimilarBrands(brandName);

  return (
    <>
      <Breadcrumb />
      <BrandDescription brandDataString={data.brandDataString} />
      <DataCardComponent
        title={false}
        cta_text={false}
        cta_url="/brands"
        slug={`brand/${brandName}`}
        data={data.productDataString}
        layout={5}
      />
      <DataCardComponent
        title="Similar Brands"
        cta_text={false}
        cta_url="/brands"
        slug="brand"
        data={similarBrands.similarBrandString}
        layout={1}
      />
    </>
  );
}
