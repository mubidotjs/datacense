import connectToDatabase from "../../db.js";
import mongoose from "mongoose";

connectToDatabase();

const registerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

// new collection for users
const Users = mongoose.models.users || mongoose.model("users", registerSchema);

export default Users;
