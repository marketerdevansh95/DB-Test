import BlogCategory from "@/models/blogCategoryModel";
import Blog from "@/models/blogModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const slug = params.slug;
    const blogCategory = await BlogCategory.findOne({ path: slug });

    if (!blogCategory) {
      return Response.json({ status: 400, error: "Blog category not found" });
    }

    const blogCategoryId = blogCategory._id;

    const blogs = await Blog.find({ blogCategory: { $in: [blogCategoryId] } });

    // console.log(blogs);

    return Response.json({ status: 200, blogs });
  } catch (error) {
    console.error(error);
    return Response.json({ error, status: 500 });
  }
}
