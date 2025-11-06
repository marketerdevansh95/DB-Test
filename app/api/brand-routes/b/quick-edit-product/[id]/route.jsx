import Product from "@/models/productModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { metaTitle, metaDescription, content } = await request.json();
    await connectToDataBase();

    const data = await Product.findByIdAndUpdate(
      id,
      { $set: { metaTitle, metaDescription, content } },
      { new: true, runValidators: true }
    );

    // Revalidate relevant pages after updating product
    revalidatePath('/brand/[brandName]', 'page'); // Brand pages
    revalidatePath('/brand/[brandName]/[productHandle]', 'page'); // Product pages

    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
