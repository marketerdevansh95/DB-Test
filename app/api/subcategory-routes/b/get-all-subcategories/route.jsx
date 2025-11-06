import SubCategory from "@/models/subCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request) {
  try {
    await connectToDataBase();
    const data = await SubCategory.find();
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
