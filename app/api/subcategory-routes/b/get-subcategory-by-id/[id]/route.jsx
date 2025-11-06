import SubCategory from "@/models/subCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectToDataBase();
    const data = await SubCategory.findById(id).select(
      "_id name path subCategoryImage order description1 description2 metaTitle metaDescription parents"
    );
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}


