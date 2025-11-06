import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";
import Category from "@/models/categoryModel";

export async function GET(request) {
  try {
    await connectToDataBase();
    const data = await Brand.find({ active: "N" }).sort({ name: 1 }).populate("category");
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
