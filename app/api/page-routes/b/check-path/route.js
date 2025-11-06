import connectMongoDB from "@/utils/connectToDataBase";
import Page from "@/models/pageModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { path } = await req.json();
    await connectMongoDB();
    const exists = await Page.findOne({ path });
    return NextResponse.json({ exists: !!exists });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
