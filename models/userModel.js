const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username required"],
      minLength: [3, "min length 3 words"],
      maxLength: [100, "max length 100 words"],
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "guest", "admin"], default: "user" },
    gender: String,
    token: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
