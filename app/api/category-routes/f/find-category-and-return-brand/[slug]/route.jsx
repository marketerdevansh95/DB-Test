import Brand from "@/models/brandModel";
import Category from "@/models/categoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    const slug = params.slug;
    await connectToDataBase();

    const category = await Category.findOne({ path: slug });

    if (!category) {
      return Response.json({ error: "Category not found", status: 400 });
    }

    const categoryId = category._id;

    const brands = await Brand.aggregate([
      {
        $match: {
          category: { $in: [categoryId] },
        },
      },
      {
        $unwind: "$category",
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoriesData",
        },
      },
      {
        $unwind: "$categoriesData",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          id: { $first: "$_id" },
          path: { $first: "$path" },
          image: { $first: "$imageUrl" },
        },
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          path: 1,
          image: 1,
        },
      },
    ]);

    return Response.json({ category, brands, status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error, status: 400 });
  }
}
