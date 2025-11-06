import Product from "@/models/productModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    const { path } = params;
    await connectToDataBase();
    const data = await Product.find({ brand: path });
    return Response.json({ status: 200, data });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500 });
  }
}
