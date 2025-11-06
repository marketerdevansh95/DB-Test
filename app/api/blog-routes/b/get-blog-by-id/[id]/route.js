import Blog from "@/models/blogModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    console.log("request trigerred")
    const { id } = params;
    await connectToDataBase();
    const data = await Blog.findById(id);
    // console.log("blog here",data)
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
