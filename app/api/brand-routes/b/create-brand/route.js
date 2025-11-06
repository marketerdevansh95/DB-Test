import connectToDataBase from "@/utils/connectToDataBase";
import Brand from "@/models/brandModel";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request) {
  try {
    const data = await request.json();
    await connectToDataBase();
    // const cData = req.body.category;
    // await Promise.all(
    //   cData.map(async (id) => {
    //     await Category.findByIdAndUpdate(
    //       id,
    //       { $inc: { brandCount : 1 } },
    //       { new: true }
    //     );
    //   })
    // );
    const brand = await Brand.create(data);
    
    // Revalidate relevant pages after creating a new brand
    revalidatePath('/'); // Home page
    revalidatePath('/brands/[pageNo]', 'page'); // All brand listing pages
    revalidatePath('/brand/[brandName]', 'page'); // Individual brand pages
    
    return Response.json({ brand, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
