import Page from "@/models/pageModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const res_data = await request.json();
    await connectToDataBase();
    const data = await Page.findByIdAndUpdate(id, res_data, { new: true });
    
    // Revalidate relevant pages after updating a page
    revalidatePath('/page/[slug]', 'page'); // Individual pages
    revalidatePath(`/page/${data.slug}`); // Specific page
    
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
