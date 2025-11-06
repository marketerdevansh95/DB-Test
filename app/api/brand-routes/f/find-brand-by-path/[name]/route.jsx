import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";
import Category from "@/models/categoryModel";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    let path = params.name;

    const brandData = await Brand.findOne({ path: path }).populate("category");

    if (brandData) {
      const currency_request = await fetch(`${brandData.url}/cart.json`, {
        cache: "no-store",
      });
      const currency_response = await currency_request.json();
      const response = await fetch(`${brandData.url}/products.json?limit=50`, {
        cache: "no-store",
      });
      const data = await response.json();
      data.currency = currency_response;
      data.brand = brandData;

      return Response.json({
        data: data,
        status: 200,
      });
    } else {
      return Response.json({ message: "Brand not Found", status: 400 });
    }
  } catch (error) {
    return Response.json({ message: "Request Failed", status: 400 });
  }
}
