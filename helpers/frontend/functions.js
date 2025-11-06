import Blog from "@/models/blogModel";
import Brand from "@/models/brandModel";
import Category from "@/models/categoryModel";
import connectMongoDB from "@/utils/connectToDataBase";

export async function getBrandForHomePage(limit = 10) {
  await connectMongoDB();
  const brandData = await Brand.aggregate([
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
    { $sample: { size: limit } },
  ]);
  return JSON.stringify(brandData);
}

export async function getFeaturedBrandForHomePage(limit = 10) {
  await connectMongoDB();
  const brandData = await Brand.aggregate([
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
    { $sample: { size: limit } },
  ]);
  return JSON.stringify(brandData);
}

export async function getCategoryForHomePage(limit = 10) {
  await connectMongoDB();
  const categoryData = await Category.aggregate([
    {
      $project: {
        _id: 0,
        id: "$_id",
        name: 1,
        path: "$path",
        image: "$categoryImage",
      },
    },
    { $sample: { size: limit } },
  ]);
  return JSON.stringify(categoryData);
}

export async function getBlogForHomePage(limit = 10) {
  await connectMongoDB();
  // Add filter for active blogs (active: "Y")
  const blogData = await Blog.find({ active: "Y" }).sort({ createdAt: -1 }).limit(limit);
  return JSON.stringify(blogData);
}
