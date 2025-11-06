import BlogCategory from "@/models/blogCategoryModel";
import Blog from "@/models/blogModel";
import Brand from "@/models/brandModel";
import Category from "@/models/categoryModel";
import Query from "@/models/queryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function POST(request) {
  try {
    await connectToDataBase();
    console.log("DB connection established");
    const brand_count = await Brand.countDocuments({ active: "Y" });
    const category_count = await Category.countDocuments();
    const blog_count = await Blog.countDocuments();
    const blog_category_count = await BlogCategory.countDocuments();
    const query_count = await Query.countDocuments();

    return Response.json({
      brand_count,
      category_count,
      blog_count,
      blog_category_count,
      query_count,
      status: 200,
    });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
