import CategorySubcategory from "@/models/categorySubcategoryModel";
import SubCategory from "@/models/subCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function PATCH(request, { params }) {
  try {
    const { id } = params; 
    await connectToDataBase();

    const body = await request.json();
    const subcategoryIds = Array.isArray(body.subcategoryIds) ? body.subcategoryIds : [];

    // Insert mappings if not already present (no deletions)
    if (subcategoryIds.length > 0) {
      await Promise.all(
        subcategoryIds.map(async (subId) => {
          await CategorySubcategory.updateOne(
            { categoryId: id, subcategoryId: subId },
            { $setOnInsert: { categoryId: id, subcategoryId: subId } },
            { upsert: true }
          );
        })
      );
    }

    // Add this category to selected subcategories' parents (no removals)
    if (subcategoryIds.length > 0) {
      await SubCategory.updateMany(
        { _id: { $in: subcategoryIds } },
        { $addToSet: { parents: id } }
      );
    }

    return Response.json({ status: 200, message: "Category subcategories updated" });
  } catch (error) {
    return Response.json({ status: 400, error: error.message }, { status: 400 });
  }
}


