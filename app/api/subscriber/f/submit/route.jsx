import Subscriber from "@/models/subscriberModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function POST(request) {
  try {
    const req_data = await request.json();
    console.log(req_data);

    await connectToDataBase();
    // const hasSubscribed = await Subscriber.findOne({ email: req_data.email });
    // console.log(hasSubscribed)
    // if (hasSubscribed) {
    //   return Response.json({ status: 202 });
    // }

    const data = await Subscriber.create(req_data);
    return Response.json({ data, status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error, status: 500 });
  }
}
