import connectToDataBase from "@/utils/connectToDataBase";
import User from "@/models/userModel";

export default async function addUser(req, res) {
  try {
    await connectToDataBase();
    console.log("connected mongodb");
    const user = await User.create(req.body);
    console.log("user crated");
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
