const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
  year: { type: Number, required: true, unique: true },
  name: String,
  description: String,
  members: [{
    name: String,
    role: String,
    image: String,
    linkedin: String
  }],
  image: String
}, { timestamps: true });
module.exports = mongoose.model('Team', teamSchema);
