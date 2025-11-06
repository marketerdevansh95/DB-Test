import User from "@/models/userModel";
import connectToDataBase from "@/utils/connectToDataBase";

export default async function resetPassword(req, res) {
  try {
    await connectToDataBase();
    const user_ = await User.find({ token: `${req.body.token}` });
    let data = {
      email: `${user_[0].email}`,
      password: `${req.body.password}`,
      token: "",
    };
    await User.findByIdAndUpdate({ _id: `${user_[0]._id}` }, data);
    res.status(201).json({ mess: "test" });
  } catch (error) {
    res.json([error]);
  }
}
