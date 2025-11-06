import BlogCategory from "@/models/blogCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const slug = params.slug;
    const blogCategory = await BlogCategory.findOne({ path: slug }).select(
      "metaTitle metaDescription"
    );

    if (!blogCategory) {
      return Response.json({ status: 400, error: "Blog category not found" });
    }

    return Response.json({ status: 200, blogCategory });
  } catch (error) {
    console.error(error);
    return Response.json({ error, status: 500 });
  }
}
