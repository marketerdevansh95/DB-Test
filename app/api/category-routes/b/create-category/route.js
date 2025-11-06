import Category from "@/models/categoryModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const data = await request.json();
    await connectToDataBase();
    const category = await Category.create(data);
    
    // Revalidate relevant pages after creating a new category
    revalidatePath('/'); // Home page
    revalidatePath('/category'); // Category listing page
    revalidatePath('/category/[categorySlug]', 'page'); // Individual category pages
    
    return Response.json({ category, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
