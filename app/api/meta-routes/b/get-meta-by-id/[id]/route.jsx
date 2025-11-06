import Meta from "@/models/metaModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const id = params.id;
    const data = await Meta.findById(id);
    if (data) {
      return Response.json({ data, status: 200 });
    } else {
      return Response.json({ message: "Meta Not Found", status: 404 });
    }
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
