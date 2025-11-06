import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";
import Category from "@/models/categoryModel";
import Product from "@/models/productModel";

export async function GET(request, { params }) {
  try {
    const path = params.name.split("&")[0];
    const handle = params.name.split("=")[1];
    await connectToDataBase();
    // console.log("Database connected", path, handle);

    const brand = await Brand.findOne({ path }).populate("category");

    console.log(brand);

    if (!brand) {
      return Response.json({ error: "Brand not found", status: 400 });
    }

    const currency_request = await fetch(`${brand.url}/cart.json`, {
      cache: "no-cache",
    });
    const currency_response = await currency_request.json();
    const product = await fetch(`${brand.url}/products/${handle}.json`, {
      cache: "no-cache",
    }).then((res) => res.json());

    const productContent = await Product.findOne({ handle: handle });

    if (!product) {
      return Response.json({
        brand: null,
        product: null,
        currency: "",
        status: 400,
      });
    }

    return Response.json({
      brand,
      product,
      currency: currency_response,
      content: productContent,
      status: 200,
    });
  } catch (error) {
    return Response.json({ error: "Internal server error", status: 400 });
  }
}
