import Category from "@/models/categoryModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const res_data = await request.json();
    await connectToDataBase();
    const data = await Category.findByIdAndUpdate(id, res_data, { new: true });
    
    // Revalidate relevant pages after updating a category
    revalidatePath('/'); // Home page
    revalidatePath('/category'); // Category listing page
    revalidatePath(`/category/${data.path}`); // Specific category page
    
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
