import SubCategory from "@/models/subCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    let data;
    let subcategory_count;
    const searchVal = params.name.split("&")[0];
    const page = params.name.split("=")[1];
    const skip = (page - 1) * 10;
    if (searchVal === "all") {
      subcategory_count = await SubCategory.countDocuments();
      data = await SubCategory.aggregate([
        {
          $skip: skip,
        },
        {
          $limit: 30,
        },
      ]);
    } else {
      const regexQuery = new RegExp(searchVal, "i");
      subcategory_count = await SubCategory.countDocuments({ name: regexQuery });
      data = await SubCategory.aggregate([
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
    return Response.json({ data, subcategory_count, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
