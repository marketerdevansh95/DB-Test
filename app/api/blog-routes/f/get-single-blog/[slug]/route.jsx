import Blog from "@/models/blogModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const slug = params.slug;
    const blog = await Blog.findOne({ path: slug }).select(
      "name description1 description2 image active tags"
    );

    if (!blog || blog.active !== "Y") {
      return Response.json({
        status: 400,
        error: "Blog not found or not active",
      });
    }

    return Response.json({ status: 200, blog });
  } catch (error) {
    console.error(error);
    return Response.json({ error, status: 500 });
  }
}
