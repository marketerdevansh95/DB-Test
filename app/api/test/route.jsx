import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request) {
  try {
    await connectToDataBase();

    const data = await Brand.find({ active: "Y" }).select("name url");
    return Response.json({ status: 200, data });
  } catch (error) {
    console.error("Error updating brands:", error);

    return new Response(
      JSON.stringify({
        message: "Error updating brands",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
