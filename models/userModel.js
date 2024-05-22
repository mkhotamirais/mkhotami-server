const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, minLength: [3, "min length 3 words"] },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: [3, "min length 3 words"] },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    token: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
