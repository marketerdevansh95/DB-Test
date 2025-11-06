import DataCardComponent from "@/FCOMPS/DataCardComponent";
import { getBlogTagged } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";

export const revalidate = 0;

export default async function AllBlogTaggedWith({ params }) {
  let blogs = [];
  const { tagSlug } = await params;
  const data = await getBlogTagged(tagSlug);
  return (
    <>
      <Breadcrumb />
      <DataCardComponent
        title={false}
        cta_text="View All"
        cta_url="/category"
        slug={`blog`}
        data={data.blogString}
        layout={6}
      />
    </>
  );
}
