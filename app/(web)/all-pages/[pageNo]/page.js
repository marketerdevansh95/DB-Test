import React from "react";
import { getAllPagesPaginate } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";
import DataCardComponent from "@/FCOMPS/DataCardComponent";
import Pagination from "@/FCOMPS/Pagination";
import { redirect } from "next/navigation";


export default async function page({params}) {
  const pageNo = (await params).pageNo || 1;
  let data = [];
  let prev,
    prev2,
    next,
    next2 = false;
  let totalPages;
  if (isNaN(pageNo) || pageNo <= 0) {
    redirect(`/all-pages/${pageNo}`);
  }
  try {
      const response = await getAllPagesPaginate(pageNo);
      console.log(response)
      if (response.error) {
        throw new Error();
      }
  
      data = response.pageDataString;
      console.log(data);
      totalPages = response.totalPages;
  
      prev = pageNo > 1;
      prev2 = pageNo > 2;
      next = pageNo < totalPages;
      next2 = pageNo < totalPages - 1;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  // console.log(data)
  return (
    <>
      <Breadcrumb />
      <DataCardComponent
        title={false}
        cta_text={false}
        cta_url="/all-pages"
        slug="page"
        data={data}
        layout={4}
        content=""
        heading="All Pages"
      />
      <Pagination
        prev={prev}
        prev2={prev2}
        next={next}
        next2={next2}
        totalPages={totalPages}
        pageNo={parseInt(pageNo)}
        pageCategory={"all-pages"}
      />
    </>
  );
}
