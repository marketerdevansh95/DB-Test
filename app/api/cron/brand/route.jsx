import Brand from "@/models/brandModel";
import connectMongoDB from "@/utils/connectToDataBase";

export async function GET(request) {
  try {
    await connectMongoDB();
    const brands = await Brand.find().sort({ name: 1 });

    const fetchStatus = async (url) => {
      try {
        const response = await fetch(`${url}/cart.json`);
        console.log(`brand success ${url}`);
        return response.status;
      } catch (error) {
        console.error(`Error fetching ${url}/cart.json:`, error);
        return 500; // Consider any fetch error as a failed status
      }
    };

    for (const brand of brands) {
      const status = await fetchStatus(brand.url);
      if (status !== 200) {
        brand.active = "N";
        await brand.save();
      }
    }

    return Response.json({ status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ status: 500, error: error.message });
  }
}
