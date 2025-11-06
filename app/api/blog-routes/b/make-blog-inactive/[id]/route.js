import Blog from "@/models/blogModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    await connectToDataBase();
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        active: "N",
      },
      {
        new: true,
      }
    );

    // Revalidate relevant pages after making blog inactive
    revalidatePath('/'); // Home page
    revalidatePath('/blog'); // Blog listing page
    revalidatePath('/blog/[slug]', 'page'); // Blog category pages
    revalidatePath(`/blog/${updatedBlog.catpath}/${updatedBlog.path}`); // Specific blog page

    return Response.json({ updatedBlog, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
