import Category from "@/models/categoryModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectToDataBase();
    const data = await Category.findByIdAndDelete(id);
    
    // Revalidate relevant pages after deleting a category
    revalidatePath('/'); // Home page
    revalidatePath('/category'); // Category listing page
    
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
