import mongoose from "mongoose";
import SubCategory from "@/models/subCategoryModel";
import CategorySubcategory from "@/models/categorySubcategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function DELETE(request, { params }) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = params;
    await connectToDataBase();

    const data1 = await SubCategory.findByIdAndDelete(id, { session });

    if (!data1) {
      throw new Error("Subcategory not found");
    }

    const data2 = await CategorySubcategory.deleteMany(
      { subcategoryId: id },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return Response.json({
      message: "Subcategory deleted successfully",
      deletedSubCategory: data1,
      deletedMappings: data2.deletedCount,
      status: 200,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return Response.json({ error: error.message }, { status: 400 });
  }
}
