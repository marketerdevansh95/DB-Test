import Category from "@/models/categoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request) {
  try {
    await connectToDataBase();

    const data = await Category.aggregate([
      {
        $project: {
          _id: 0,
          name: 1,
          path: 1,
          image: "$categoryImage",
          description1: 1,
        },
      },
    ]);

    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error: error.message, status: 400 });
  }
}
