import CategorySubcategory from "@/models/categorySubcategoryModel";
import SubCategory from "@/models/subCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectToDataBase();

    const mappings = await CategorySubcategory.find({ categoryId: id }).select(
      "subcategoryId"
    );

    const subcategoryIds = mappings.map((m) => m.subcategoryId);

    const subcategories = await SubCategory.find({ _id: { $in: subcategoryIds } })
      .sort({ name: 1 })
      .select("_id name path");

    return Response.json({ data: subcategories, status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}


