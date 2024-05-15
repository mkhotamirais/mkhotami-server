const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minLength: [3, `min length 3 words`],
      maxLength: [50, `max length 50 words`],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
