import Blog from "@/FCOMPS/Blog";
import DataCardComponent from "@/FCOMPS/DataCardComponent";
import { getSingleBlog, getBlogCategoryBlogs } from "@/functions/frontend";
import Breadcrumb from "@/utils/Breadcrumb";

export const revalidate = 0;

export default async function BlogPage({ params }) {
  const { slug, blogSlug } = await params;
  const data = await getSingleBlog(blogSlug);
  const similarBlogs = await getBlogCategoryBlogs(slug);

  const similarList = JSON.parse(similarBlogs.categoryBlogsString || "[]");
  const filteredSimilar = similarList.filter((item) => item?.path !== blogSlug);
  const filteredSimilarString = JSON.stringify(filteredSimilar);

  return (
    <>
      <Breadcrumb />
      <Blog blogString={data.blogString} />
      <DataCardComponent
        title="Similar Blogs"
        cta_text=""
        cta_url="/blog"
        slug={`blog`}
        data={filteredSimilarString}
        layout={6}
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
