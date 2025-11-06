import Blog from "@/models/blogModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const slug = params.slug.replaceAll("-"," ");
    const blogs = await Blog.find({ tags: { $regex: new RegExp(slug, "i") }, active: "Y" });

    if (!blogs || blogs.length === 0) {
      return Response.json({
        status: 400,
        error: "No active blogs found with the provided tag",
      });
    }

    return Response.json({ status: 200, blogs });
  } catch (error) {
    console.error(error);
    return Response.json({ error, status: 500 });
  }
}