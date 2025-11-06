import BlogCategory from "@/models/blogCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function DELETE(request, { params }) {
  try {
    await connectToDataBase();
    const id = params.id;
    const data = await BlogCategory.findByIdAndDelete(id);
    
    // Revalidate relevant pages after deleting a blog category
    revalidatePath('/blog'); // Blog listing page
    revalidatePath('/blog/[slug]', 'page'); // Blog category pages
    
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
