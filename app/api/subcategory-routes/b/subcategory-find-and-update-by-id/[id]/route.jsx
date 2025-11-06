import mongoose from "mongoose";
import SubCategory from "@/models/subCategoryModel";
import CategorySubcategory from "@/models/categorySubcategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function PATCH(request, { params }) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = params;
    await connectToDataBase();
    const body = await request.json();

    const update = {
      name: body.name,
      path: body.path,
      subCategoryImage: body.subCategoryImage,
      order: body.order,
      description1: body.description1,
      description2: body.description2,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      parents: Array.isArray(body.parents) ? body.parents : [],
    };

    const updated = await SubCategory.findByIdAndUpdate(id, update, { new: true, session });

    await CategorySubcategory.deleteMany({ subcategoryId: id }, { session });

    if (update.parents.length > 0) {
      const mappings = update.parents.map((catId) => ({
        categoryId: catId,
        subcategoryId: id,
      }));
      await CategorySubcategory.insertMany(mappings, { session });
    }

    await session.commitTransaction();
    session.endSession();

    return Response.json({ status: 200, data: updated });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return Response.json({ status: 400, error: error.message }, { status: 400 });
  }
}

