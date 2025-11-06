import DataCardComponent from "@/FCOMPS/DataCardComponent";
import { getBlogCategoryBlogs } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";

// Enable ISR with 60 seconds revalidation for blog category pages
export const revalidate = 0;

export default async function AllBlogPage({ params }) {
  const { slug } = await params;
  const data = await getBlogCategoryBlogs(slug);

  
  return (
    <>
      <Breadcrumb />
      <DataCardComponent
        title={false}
        cta_text="View All"
        cta_url="/category"
        slug={`blog`}
        data={data.categoryBlogsString}
        layout={6}
        heading="Blogs"
      />
      <DataCardComponent
        title="Featured Brands"
        cta_text=""
        cta_url="/brands"
        slug="brand"
        data={data.brandString}
        content="Explore and shop from the most popular brands that are adored by millions, now at Discovering Brands."
        layout={3}
      />
    </>
  );
}
