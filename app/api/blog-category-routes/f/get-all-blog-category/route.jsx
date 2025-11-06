import BlogCategory from "@/models/blogCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request) {
  try {
    await connectToDataBase();
    const data = await BlogCategory.find().select(
      "name path image description"
    );
    if (data.length > 0) {
      return Response.json({ data, status: 200 });
    } else {
      return Response.json({ status: 404 });
    }
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
