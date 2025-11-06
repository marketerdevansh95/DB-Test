import Blog from "@/models/blogModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request) {
  try {
    await connectToDataBase();
    const data = await Blog.find({ active: "N" }).sort({ name: 1 });
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
