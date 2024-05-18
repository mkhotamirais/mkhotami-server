const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      // unique: true,
      // minLength: [3, `min length 3 words`],
      // maxLength: [50, `max length 50 words`],
    },
    price: {
      type: Number,
      // required: true,
      default: 0,
    },
    description: { type: String },
    imageName: String,
    // category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    // tags: { type: Array, ref: "Tag", default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
