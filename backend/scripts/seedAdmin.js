require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Mongo connected');
    
    // Your User model (adjust path if needed)
    const User = mongoose.model('User', new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ['admin', 'user'], default: 'user' },
      name: String
    }));
    
    const email = 'admin@iitgracing.com';
    const password = 'password123';
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Delete existing, create new
    await User.deleteOne({ email });
    await User.create({
      email,
      password: password,
      role: 'admin',
      name: 'Admin User'
    });
    
    console.log('✅ Admin created!');
    console.log('📧 Email:', email);
    console.log('🔑 Password: password123');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin();
