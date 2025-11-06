import { cookies } from "next/headers";

export async function GET(request) {
  cookies().delete("token");
  return Response.json({ message: "User Logged Out", status: 200 });
}
