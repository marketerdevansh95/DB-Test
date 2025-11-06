import BlogCategory from "@/models/blogCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function POST(request) {
  try {
    await connectToDataBase();
    const data = await BlogCategory.find().select("name path");
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
