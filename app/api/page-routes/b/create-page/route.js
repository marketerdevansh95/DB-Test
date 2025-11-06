import Page from "@/models/pageModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    await connectToDataBase();
    const page_data = await request.json();
    const data = await Page.create(page_data);
    
    // Revalidate relevant pages after creating a new page
    revalidatePath('/page/[slug]', 'page'); // Individual pages
    revalidatePath(`/page/${data.slug}`); // Specific page
    
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 5000 });
  }
}
