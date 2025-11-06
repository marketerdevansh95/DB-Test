import BlogCategory from "@/models/blogCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const data = await request.json();
    await connectToDataBase();
    const blogCategory = await BlogCategory.create(data);
    
    // Revalidate relevant pages after creating a new blog category
    revalidatePath('/blog'); // Blog listing page
    revalidatePath('/blog/[slug]', 'page'); // Blog category pages
    
    return Response.json({ blogCategory, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
