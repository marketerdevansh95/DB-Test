import BlogCategory from "@/models/blogCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const id = params.id;
    const data = await BlogCategory.findById(id);
    // console.log("bc data", data);
    if (data) {
      return Response.json({ data, status: 200 });
    } else {
      return Response.json({ status: 400 });
    }
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
