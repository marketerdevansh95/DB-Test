import Page from "@/models/pageModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectToDataBase();
    const data = await Page.findByIdAndDelete(id);
    
    // Revalidate relevant pages after deleting a page
    revalidatePath('/page/[slug]', 'page'); // Individual pages
    
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
