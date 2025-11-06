import mongoose from "mongoose";
import SubCategory from "@/models/subCategoryModel";
import CategorySubcategory from "@/models/categorySubcategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function POST(request) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = await request.json();
    await connectToDataBase();

    const parentCats = data.parents;

    const subCategory = await SubCategory.create([data], { session });
    const subCat = subCategory[0];

    const mapping = parentCats.map((catId) => ({
      categoryId: catId,
      subcategoryId: subCat._id,
    }));


    const categorySubcategory = await CategorySubcategory.insertMany(mapping, { session });

    await session.commitTransaction();
    session.endSession();

    return Response.json(
      { subCategory: subCat, categorySubcategory },
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return Response.json({ error: error.message }, { status: 400 });
  }
}

