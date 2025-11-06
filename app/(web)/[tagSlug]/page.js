import DataCardComponent from "@/FCOMPS/DataCardComponent";
import Breadcrumb from "@/utils/Breadcrumb";

export const revalidate = 0;

export default async function AllBrandTaggedWith({ params }) {
  let brands = [];
  const { tagSlug } = params;
  try {
    const request = await fetch(
      `${process.env.BASE_URL}/api/brand-routes/f/get-brand-tagged-with/${tagSlug}`,
      {cache: "no-cache" }
    );

    const response = await request.json();
    if (response.status === 200) {
      brands = response.brands;
    } else {
      return new Error();
    }
  } catch (error) {
    // console.log("Error loading all brands", error);
    return new Error();
  }

  return (
    <>
      <Breadcrumb />
      <DataCardComponent
        title={false}
        cta_text="View All"
        cta_url="/category"
        slug={`brand`}
        data={brands}
        layout={3}
      />
    </>
  );
}
