import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const res_data = await request.json();
    await connectToDataBase();
    const data = await Brand.findByIdAndUpdate(id, res_data, { new: true });
    
    // Revalidate relevant pages after quick editing a brand
    revalidatePath('/'); // Home page
    revalidatePath('/brands/[pageNo]', 'page'); // All brand listing pages
    revalidatePath(`/brand/${data.path}`); // Specific brand page
    
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
