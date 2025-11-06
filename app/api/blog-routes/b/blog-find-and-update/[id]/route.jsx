import Blog from "@/models/blogModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const res_data = await request.json();
    await connectToDataBase();
    const data = await Blog.findByIdAndUpdate(id, res_data, { new: true });
    
    // Revalidate relevant pages after updating a blog
    revalidatePath('/'); // Home page
    revalidatePath('/blog'); // Blog listing page
    revalidatePath(`/blog/${data.path}`); // Specific blog page
    
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
