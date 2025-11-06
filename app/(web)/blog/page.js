import DataCardComponent from "@/FCOMPS/DataCardComponent";
import { getBlogCategory } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";

export const revalidate = 0;

export default async function AllBlogCategoryPage() {
  const data = await getBlogCategory();

  return (
    <>
      <Breadcrumb />
      <DataCardComponent
        title={false}
        cta_text="View All"
        cta_url="/category"
        slug="blog"
        data={data.blogCategoryString}
        layout={4}
        heading="Blog Categories"

      />
    </>
  );
}
