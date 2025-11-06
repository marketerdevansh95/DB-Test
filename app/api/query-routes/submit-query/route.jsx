import Query from "@/models/queryModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function POST(request) {
  try {
    await connectToDataBase();
    const req_data = await request.json();
    // console.log(req_data)
    const data = await Query.create(req_data);
    // console.log(data)
    return Response.json({ data, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 400 });
  }
}
