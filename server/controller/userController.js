import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.find({ email });
    const user = users[0];
    console.log(user);

    if (!user) {
      return res.status(401).json({ error: "User Not Exist" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
};

export const register = async (req, res) => {
  try {
    const { password, email, fullName, mobile, role } = req.body;

    const existingUser = await User.find({ email });

    if (existingUser.length >= 1) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      password: hashedPassword,
      email,
      fullName,
      mobile,
      role: role || "borrower",
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "logged out Successfully!",
    });
  } catch (error) {
    console.error("error inside logout :: ", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
