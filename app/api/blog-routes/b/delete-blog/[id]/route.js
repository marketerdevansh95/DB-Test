import Blog from "@/models/blogModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectToDataBase();
    const data = await Blog.findByIdAndDelete(id);
    
    // Revalidate relevant pages after deleting a blog
    revalidatePath('/'); // Home page
    revalidatePath('/blog'); // Blog listing page
    
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
