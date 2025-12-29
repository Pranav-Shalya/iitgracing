const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: Date,
  type: { type: String, enum: ['workshop', 'competition', 'announcement', 'achievement'] },
  description: String,
  rules: String,
  prize: String,
  images: [String],
  isFeatured: { type: Boolean, default: false },
  link: String
}, { timestamps: true });
module.exports = mongoose.model('Event', eventSchema);
