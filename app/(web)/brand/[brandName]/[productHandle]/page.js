import DataCardComponent from "@/FCOMPS/DataCardComponent";
import Product from "@/FCOMPS/Product";
import { getBrandAndSingleProduct, getSimilarBrands } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";

export const revalidate = 0;

export default async function ProductDetail({ params }) {
  const { brandName, productHandle } = await params;

  const data = await getBrandAndSingleProduct(brandName, productHandle);
  const similarBrands = await getSimilarBrands(brandName);

  return (
    <>
      <Breadcrumb />
      <Product
        brandString={data.brandString}
        productString={data.productString}
        currencyString={data.currencyString}
      />
      <DataCardComponent
        title="More Products"
        cta_text={false}
        cta_url="/brands"
        slug={`brand/${brandName}`}
        data={data.moreString}
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
