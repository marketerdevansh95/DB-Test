import Blog from "@/models/blogModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await connectToDataBase();
    let data;
    let blog_count;
    const searchVal = slug.split("&")[0];
    const page = slug.split("=")[1];
    const skip = (page - 1) * 10;
    if (searchVal === "all") {
      blog_count = await Blog.countDocuments();
      data = await Blog.find().sort({ createdAt: -1 }).skip(skip).limit(10);
    } else {
      const regexQuery = new RegExp(searchVal, "i");
      blog_count = await Blog.countDocuments({
        name: regexQuery,
      });
      data = await Blog.find({ name: regexQuery }).skip(skip).limit(10);
    }
    return Response.json({ data, blog_count, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
