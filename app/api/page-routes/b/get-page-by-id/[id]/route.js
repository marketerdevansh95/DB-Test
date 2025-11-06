import Page from "@/models/pageModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  console.log("parms here2", params);
  try {
    const { id } = await params;
    await connectToDataBase();
    const data = await Page.findById(id);
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
