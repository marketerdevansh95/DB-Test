import BlogCategory from "@/models/blogCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    let data;
    const searchVal = params.name;
    if (searchVal === "all") {
      data = await BlogCategory.find();
    } else {
      const regexQuery = new RegExp(searchVal, "i");
      data = await BlogCategory.aggregate([
        {
          $match: { name: regexQuery },
        },
      ]);
    }
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
