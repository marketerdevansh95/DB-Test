import DataCardComponent from "@/FCOMPS/DataCardComponent";
import Pagination from "@/FCOMPS/Pagination";
import { getAllBrandsPaginate } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";
import { redirect } from "next/navigation";
import InfiniteClient from "@/FCOMPS/InfiniteClient";

// Enable ISR with 30 seconds revalidation for brand listings
export const revalidate = 0;

export default async function BrandsListPage({  }) {
  // const pageNo = (await params).pageNo || 1;
  // let brands = [];
  // let prev,
  //   prev2,
  //   next,
  //   next2 = false;
  // let totalPages;

  // if (isNaN(pageNo) || pageNo <= 0) {
  //   redirect(`/brand/${pageNo}`);
  // }

  // try {
  //   const response = await getAllBrandsPaginate(pageNo);

  //   if (response.error) {
  //     throw new Error();
  //   }

  //   brands = response.brandDataString;
  //   totalPages = response.totalPages;

  //   prev = pageNo > 1;
  //   prev2 = pageNo > 2;
  //   next = pageNo < totalPages;
  //   next2 = pageNo < totalPages - 1;
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
  const response = await getAllBrandsPaginate(1);
  const brands = response.brandDataString;
  const totalPages = response.totalPages;
  return (
    
    <>
      <Breadcrumb />
      <DataCardComponent
        title={false}
        cta_text={false}
        cta_url="/brands"
        slug="brand"
        data={brands}
        layout={3}
        heading="Brands"

      />
      <InfiniteClient startPage={1} totalPages={totalPages} />

      {/* <Pagination
        prev={prev}
        prev2={prev2}
        next={next}
        next2={next2}
        totalPages={totalPages}
        pageNo={parseInt(pageNo)}
        pageCategory={"brands"}
      /> */}
    </>
  );
}
