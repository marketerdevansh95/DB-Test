import Query from "@/models/queryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function DELETE(request, { params }) {
  try {
    await connectToDataBase();
    const id = (await params).id;
    const data = await Query.findByIdAndDelete(id);
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
