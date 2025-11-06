import SubCategory from "@/models/subCategoryModel";
import connectToDataBase from "@/utils/connectToDataBase";


export async function PATCH(request, { params }) {
  try {
    console.log("HI");
    const { id } = await params;
    const res_data = await request.json();
    await connectToDataBase();
    console.log("PATCH ID:", id);
    console.log("PATCH BODY:", res_data);
    const data = await SubCategory.findByIdAndUpdate(id, res_data, { new: true });
    if (!data) {
      return Response.json({ error: "SubCategory not found" }, { status: 404 });
    }
    console.log("route hit")
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}