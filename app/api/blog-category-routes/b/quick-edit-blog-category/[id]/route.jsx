import BlogCategory from "@/models/blogCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { metaTitle, metaDescription } = await request.json();
    await connectToDataBase();

    const data = await BlogCategory.findByIdAndUpdate(
      id,
      { $set: { metaTitle, metaDescription } },
      { new: true, runValidators: true }
    );

    // Revalidate relevant pages after quick editing a blog category
    revalidatePath('/blog'); // Blog listing page
    revalidatePath('/blog/[slug]', 'page'); // Blog category pages
    revalidatePath(`/blog/${data.path}`); // Specific blog category page

    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
