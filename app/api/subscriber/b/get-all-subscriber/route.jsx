import Subscriber from "@/models/subscriberModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request) {
  try {
    await connectToDataBase();
    const data = await Subscriber.find();
    return Response.json({ data, status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error, status: 500 });
  }
}
