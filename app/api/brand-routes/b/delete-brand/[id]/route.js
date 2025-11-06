import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectToDataBase();
    const data = await Brand.findByIdAndDelete(id);
    
    // Revalidate relevant pages after deleting a brand
    revalidatePath('/'); // Home page
    revalidatePath('/brands/[pageNo]', 'page'); // All brand listing pages
    
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
