import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timeseries: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
