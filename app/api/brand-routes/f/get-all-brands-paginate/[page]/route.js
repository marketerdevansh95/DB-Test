import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();

    const brandCount = await Brand.countDocuments({ active: "Y" });

    const { page: pageParam } = await params;
    const page = parseInt(pageParam);
    
    console.log(`API Route: Fetching page ${page}, total brands: ${brandCount}`);
    const pageSize = 54;
    const skipCount = (page - 1) * pageSize;
    const totalPages = Math.ceil(brandCount / pageSize);

    if (isNaN(page) || page <= 0) {
      return Response.json({ error: "Invalid page parameter", status: 400 });
    }
    if (page > totalPages) {
      return Response.json({
        error: "Page number exceeds total pages",
        status: 400,
      });
    }

    const data = await Brand.aggregate([
      {
        $match: { active: "Y" },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          path: "$path",
          image: "$imageUrl",
        },
      },
      {
        $sort: { name: 1 },
      },
      {
        $skip: skipCount,
      },
      {
        $limit: pageSize,
      },
    ]);

    // Clean up image URLs by trimming whitespace and filtering invalid URLs
    const cleanedData = data.map(brand => {
      let cleanImage = brand.image ? brand.image.trim() : null;
      
      // Check if the image URL is valid
      if (cleanImage && cleanImage.length > 0) {
        try {
          new URL(cleanImage);
          // If it's a valid URL, keep it
        } catch (e) {
          // If it's not a valid URL, set to null
          cleanImage = null;
        }
      } else {
        cleanImage = null;
      }
      
      return {
        ...brand,
        image: cleanImage
      };
    });

    return Response.json({ data: cleanedData, totalPages, status: 200 });
  } catch (error) {
    console.error("Error retrieving brand data:", error);
    return Response.json({ error: "Error retrieving brand data", status: 400 });
  }
}
