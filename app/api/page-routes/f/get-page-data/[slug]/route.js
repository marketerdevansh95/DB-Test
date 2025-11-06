import Page from "@/models/pageModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const slug = params.slug;
    const data = await Page.findOne({ path: slug });
    if (!data) {
      return Response.json({ status: 400 });
    }
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
