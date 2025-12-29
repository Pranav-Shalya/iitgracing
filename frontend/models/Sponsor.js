const mongoose = require('mongoose');
const sponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  type: { type: String, enum: ['title', 'technical', 'financial'] },
  website: String,
  description: String,
  year: Number
}, { timestamps: true });
module.exports = mongoose.model('Sponsor', sponsorSchema);
