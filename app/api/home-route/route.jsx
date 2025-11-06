import Blog from "@/models/blogModel";
import Brand from "@/models/brandModel";
import Category from "@/models/categoryModel";
import Page from "@/models/pageModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request) {
  try {
    await connectToDataBase();

    const [brandData, categoryData, blogData, pageData] = await Promise.all([
      Brand.aggregate([
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            path: "$path",
            image: "$imageUrl",
            description1: 1,
          },
        },
        { $sample: { size: 10 } },
      ]),
      Category.aggregate([
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            path: 1,
            image: "$categoryImage",
          },
        },
        { $sample: { size: 10 } },
      ]),
      Blog.find().sort({ createdAt: -1 }).limit(10),
      Page.findOne({ path: "home-static-data" }),
    ]);

    return Response.json({
      status: 200,
      data: { brandData, categoryData, blogData, pageData },
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
