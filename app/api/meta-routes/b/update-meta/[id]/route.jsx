import Meta from "@/models/metaModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
  try {
    await connectToDataBase();
    const id = params.id;
    const req_data = await request.json();
    const data = await Meta.findByIdAndUpdate(id, req_data, { new: true });
    
    // Revalidate all pages since meta can affect any page
    revalidatePath('/', 'layout'); // Revalidate entire site
    
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
