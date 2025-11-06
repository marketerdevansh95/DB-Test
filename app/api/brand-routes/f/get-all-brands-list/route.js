import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function POST(request) {
  try {
    await connectToDataBase();
    const data = await Brand.aggregate([
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
          brandName: { $first: "$name" },
          brandId: { $first: "$_id" },
          path: { $first: "$path" },
          imageUrl: { $first: "$imageUrl" },
          description1: { $first: "$description1" },
          categories: {
            $push: {
              name: "$categoriesData.name",
              path: "$categoriesData.path",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          brandId: 1,
          brandName: 1,
          categories: 1,
          path: 1,
          imageUrl: 1,
          description1: 1,
        },
      },
    ]);

    // console.log("data here", data);

    return Response.json({ data, status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error, status: 400 });
  }
}
