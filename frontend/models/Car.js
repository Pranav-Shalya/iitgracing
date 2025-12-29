const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true,required: false,  // ✅ OPTIONAL
    default: null  },
  category: {
    type: String,
    enum: ['formula', 'efficycle', 'baja', 'concept'],
    required: true,
    default: 'formula'  // ✅ BACKUP DEFAULT
  },
  year: Number,
  titleLine: String,
  descriptionTop: String,
  descriptionBottom: String,
  specs: {
    maxSpeedKmph: Number,
    engine: String,
    torqueNm: Number
  },
  images: [String],        // ✅ NEW
  highlights: [String],    // ✅ NEW
  designNotes: String      // ✅ NEW
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
