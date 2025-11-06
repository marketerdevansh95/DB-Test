import Blog from "@/models/blogModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const slug = params.slug;
    const data = await Blog.findOne({ path: slug }).select(
      "metaTitle metaDescription active"
    );

    if (!data || data.active !== "Y") {
      return Response.json({
        status: 400,
        error: "Blog not found or not active",
      });
    }

    return Response.json({ status: 200, data });
  } catch (error) {
    console.error(error);
    return Response.json({ error, status: 500 });
  }
}
