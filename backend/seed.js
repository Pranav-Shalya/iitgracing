require('dotenv').config();
const mongoose = require('mongoose');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🌱 Connected to MongoDB');

    const Car = require('./models/Car');
    const Team = require('./models/Team');
    
    console.log('✅ Models loaded');

    // Insert data (skip delete - manual clear if needed)
    const srijan = await Car.create({
      name: "Srijan",
      year: 2012,
      type: "ICE",
      description: "First Baja ATV",
      specs: { engine: "340cc", topSpeed: 56.25, chassis: "AISI 1020" },
      status: "active"
    });

    console.log('✅ Srijan created:', srijan._id);
    
    console.log('✅ Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
