import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";
import Category from "@/models/categoryModel";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    let data;
    let brand_count;
    const searchVal = (await params).name.split("&")[0];
    const page = (await params).name.split("=")[1];
    const skip = (page - 1) * 50;
    const populateOptions = {
      path: "category",
      select: { name: 1 },
    };

    if (searchVal === "all") {
      brand_count = await Brand.countDocuments();
      data = await Brand.find({active : "Y"})
        .skip(skip)
        .limit(50)
        .sort({name : 1})
        .populate(populateOptions);
    } else {
      const regexQuery = new RegExp(searchVal, "i");
      brand_count = await Brand.countDocuments({ name: regexQuery });
      data = await Brand.find({ name: regexQuery })
        .skip(skip)
        .limit(50)
        .sort({name : 1})
        .populate(populateOptions);
    }
    return Response.json({ data, brand_count, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
