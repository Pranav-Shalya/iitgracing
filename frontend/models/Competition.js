const mongoose = require('mongoose');
const competitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, enum: ['Formula Bharat', 'Supra SAE', 'BAJA', 'InterIIT', 'PanIIT'] },
  position: String,
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
  description: String,
  images: [String]
}, { timestamps: true });
module.exports = mongoose.model('Competition', competitionSchema);
