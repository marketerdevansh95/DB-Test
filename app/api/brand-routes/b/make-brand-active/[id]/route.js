import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    await connectToDataBase();
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      {
        active: "Y",
      },
      {
        new: true,
      }
    );

    // Revalidate relevant pages after making brand active
    revalidatePath('/'); // Home page
    revalidatePath('/brands/[pageNo]', 'page'); // All brand listing pages
    revalidatePath(`/brand/${updatedBrand.path}`); // Specific brand page

    return Response.json({ updatedBrand, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
