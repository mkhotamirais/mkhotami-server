const mongoose = require("mongoose");

const kamusSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    meaning: { type: String, required: true },
    reference: [
      {
        refName: { type: String },
        refLink: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Kamus", kamusSchema);
