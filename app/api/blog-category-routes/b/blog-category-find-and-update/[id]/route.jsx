import BlogCategory from "@/models/blogCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  try {
    await connectToDataBase();
    const id = params.id;
    const req_data = await request.json();
    const data = await BlogCategory.findByIdAndUpdate(id, req_data, { new: true });
    
    // Revalidate relevant pages after updating a blog category
    revalidatePath('/blog'); // Blog listing page
    revalidatePath('/blog/[slug]', 'page'); // Blog category pages
    revalidatePath(`/blog/${data.path}`); // Specific blog category page
    
    console.log(data);
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
