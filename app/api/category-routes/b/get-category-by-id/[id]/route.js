import Category from "@/models/categoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  console.log("parms here2", params);
  try {
    const { id } = params;
    await connectToDataBase();
    console.log("mongodb connected")
    const data = await Category.findById(id);
    // console.log("data here",data)
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
