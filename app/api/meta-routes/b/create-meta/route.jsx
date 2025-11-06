import Meta from "@/models/metaModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    await connectToDataBase();
    const req_data = await request.json();
    const data = await Meta.create(req_data);
    
    // Revalidate all pages since meta can affect any page
    revalidatePath('/', 'layout'); // Revalidate entire site
    
    console.log(data)
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ message: "Unable to create", status: 400 });
  }
}
