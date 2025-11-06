import Meta from "@/models/metaModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request) {
  try {
    await connectToDataBase();
    const data = await Meta.find().select("homeMetaTitle homeMetaDescription");
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ status: 400 });
  }
}
