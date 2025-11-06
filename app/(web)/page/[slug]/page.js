import PageComponent from "@/FCOMPS/PageComponent";
import { getPage } from "@/functions/frontend";

export const revalidate = 0;

const Page = async ({ params }) => {
  const slug =  (await params).slug;

  const data = await getPage(slug);
  if (data.error) {
    return <div className="text-red-500">Error loading page</div>;
  }
  
  return (
    <PageComponent data={data.page.content} />
  );
};

export default Page;
