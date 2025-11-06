import Category from "@/models/categoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    let data;
    let category_count;
    const searchVal = params.name.split("&")[0];
    const page = params.name.split("=")[1];
    const skip = (page - 1) * 10;
    if (searchVal === "all") {
      category_count = await Category.countDocuments();
      data = await Category.aggregate([
        {
          $skip: skip,
        },
        {
          $limit: 30,
        },
      ]);
    } else {
      const regexQuery = new RegExp(searchVal, "i");
      category_count = await Category.countDocuments({ name: regexQuery });
      data = await Category.aggregate([
        {
          $match: { name: regexQuery },
        },
        {
          $skip: skip,
        },
        {
          $limit: 30,
        },
      ]);
    }
    return Response.json({ data, category_count, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
