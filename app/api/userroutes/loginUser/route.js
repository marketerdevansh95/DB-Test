import User from "@/models/userModel";
import connectToDataBase from "@/utils/connectToDataBase";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const res = await request.json();
    const { email, password } = res;
    await connectToDataBase();
    const user = await User.find({ email });
    // console.log(user);
    if (user) {
      if (user[0].password == password) {
        cookies().set("token", "user", { secure: true });
        return Response.json({
          message: "User Logged In Successfully",
          status: 201,
        });
      } else {
        return Response.json({ message: "Invalid Credentials", status: 201 });
      }
    } else {
      return Response.json({ message: "Invalid USER", status: 201 });
    }
  } catch (error) {
    return Response.json({ error, status: 201 });
  }
}
