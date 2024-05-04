import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "borrower"],
    required: true,
    default: "borrower",
  },
});
const User = mongoose.model("User", userSchema);
export default User;
