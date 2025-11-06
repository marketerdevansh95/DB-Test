import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    let path = params.slug;
    // console.log("params here",params)

    const brand = await Brand.findOne({ path: path });

    if (brand) {
      return Response.json({ brand, status: 200 });
    } else {
      return Response.json({ message: "Brand not Found", status: 400 });
    }
  } catch (error) {
    return Response.json({ message: "Request Failed", status: 400 });
  }
}
