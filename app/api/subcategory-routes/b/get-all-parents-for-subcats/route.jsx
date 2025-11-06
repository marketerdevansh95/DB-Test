import SubCategory from "@/models/subCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function POST(request) {
  try {
    await connectToDataBase();
    const data = await SubCategory.find().sort({ name: 1 }).select("name _id");

    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
