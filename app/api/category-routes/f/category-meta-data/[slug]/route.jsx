import Category from "@/models/categoryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    const slug = params.slug;
    await connectToDataBase();

    const category = await Category.findOne({ path: slug }).select(
      "metaTitle metaDescription"
    );

    if (!category) {
      return Response.json({ error: "Category not found", status: 400 });
    }
    return Response.json({ category, status: 400 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error, status: 400 });
  }
}
