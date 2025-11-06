import Blog from "@/models/blogModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const data = await request.json();
    await connectToDataBase();
    const blog = await Blog.create(data);
    
    // Revalidate relevant pages after creating a new blog
    revalidatePath('/'); // Home page
    revalidatePath('/blog'); // Blog listing page
    revalidatePath('/blog/[slug]', 'page'); // Individual blog pages
    
    return Response.json({ blog, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
