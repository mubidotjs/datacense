import connectToDatabase from "../../db.js";
import mongoose from "mongoose";

connectToDatabase();

const grandpaSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    veteran: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// new collection for users
const Grandpas =
  mongoose.models.grandpas || mongoose.model("grandpas", grandpaSchema);

export default Grandpas;
