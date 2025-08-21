// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await Admin.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

     if (password !== user.password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }


    // generate token
    const token = jwt.sign(
      { id: user._id,  superadmin: user.isSuperAdmin},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, name: user.name, superadmin: user.isSuperAdmin} });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
