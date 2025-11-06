import Brand from "@/models/brandModel";
import connectToDataBase from "@/utils/connectToDataBase";

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const searchVal = (await params).name || "all";
    let data;

    if (searchVal === "all") {
      data = await Brand.aggregate([
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            path: "$path",
            image: "$imageUrl",
            description1: 1,
          },
        },
        {
          $sample: { size: 50 },
        },
      ]);
    } else {
      const regexQuery = new RegExp(searchVal, "i");
      data = await Brand.aggregate([
        {
          $match: { name: regexQuery },
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            path: "$path",
            image: "$imageUrl",
            description1: 1,
          },
        },
      ]);
    }

    data = JSON.stringify(data);

    return Response.json({ data, status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error, status: 400 });
  }
}
