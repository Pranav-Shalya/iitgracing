require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing model imports...');

try {
  const Car = require('./models/Car');
  console.log('✅ Car model loaded:', Car.modelName);
  
  const Team = require('./models/Team');
  console.log('✅ Team model loaded:', Team.modelName);
  
  console.log('✅ All models working!');
} catch (error) {
  console.error('❌ Model import failed:', error.message);
}
