import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const slug = params.slug.replaceAll("-"," ");
    const brands = await Brand.find({ tags: { $regex: new RegExp(slug, "i") }, active: "Y" });

    if (!brands || brands.length === 0) {
      return Response.json({
        status: 400,
        error: "No active brands found with the provided tag",
      });
    }

    return Response.json({ status: 200, brands });
  } catch (error) {
    console.error(error);
    return Response.json({ error, status: 500 });
  }
}