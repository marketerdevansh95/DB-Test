import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";
import Category from "@/models/categoryModel";
import Product from "@/models/productModel";

export async function GET(request, { params }) {
  try {
    const path = params.name.split("&")[0];
    const handle = params.name.split("&")[1];
    await connectToDataBase();

    let product = await Product.findOne({ handle: handle });
    if (product) {
      return Response.json({ status: 201, product });
    }

    const brand = await Brand.findOne({ path })
      .select("name url path")
      .populate("category");

    if (!brand) {
      return Response.json({ error: "Brand not found", status: 400 });
    }

    const productResponse = await fetch(
      `${brand.url}/products/${handle}.json`,
      { cache: "no-cache" }
    );
    if (!productResponse.ok) {
      return Response.json({ error: "Product not found", status: 400 });
    }

    product = await productResponse.json();
    product["brand"] = brand;

    return Response.json({ product, status: 200 });
  } catch (error) {
    return Response.json({ error: "Internal server error", status: 400 });
  }
}
