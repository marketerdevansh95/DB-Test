import Brand from "@/models/brandModel";
import Category from "@/models/categoryModel";
import connectToDataBase from "@/utils/connectToDataBase";
import mongoose from "mongoose";

export async function POST(request, { params }) {
  try {
    const { slug } = params;
    const categoryId = new mongoose.Types.ObjectId(slug);
    await connectToDataBase();

    const brands = await Brand.aggregate([
      {
        $match: {
          category: categoryId,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          path: { $first: "$path" },
          metaTitle: { $first: "$metaTitle" },
          metaDescription: { $first: "$metaDescription" },
          category: { $first: "$category" },
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
    ]);

    return Response.json({ brands, status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error, status: 400 });
  }
}
