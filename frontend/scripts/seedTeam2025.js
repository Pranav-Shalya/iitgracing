// backend/seedTeam2025.js
require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('../models/Team');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Mongo connected');

  // remove existing 2025 team if any
  await Team.deleteOne({ year: 2025 });

  await Team.create({
    year: 2025-2026,
    name: 'IITG Racing',
    description:
      'IIT Guwahati’s Formula Student team with student heads across subsystems and core.',
    members: [
      { name: 'Ryan Sequeira', role: 'Captain',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Ronak', role: 'Secretary',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Akaash S S', role: 'Overall Coordinator',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Vasanth P', role: 'Aerodynamics and Thermal Head',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Yashvardhan', role: 'High Voltage Head',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Mohnish Raja', role: 'Steering and Brakes Head',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Avani Thorat', role: 'Design Head',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Suraj Mahale', role: 'Design Head',image: '/team/ryan.jpg', linkedin: '' },
      {
        name: 'Neel Kedia',
        role: 'Vehicle Dynamics and Suspension Head',
        image: '/team/ryan.jpg',
        linkedin: ''
      },
      { name: 'Pranav Shalya', role: 'Tractive Head',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Vaibhav Kumar', role: 'Chassis Head',image: '/team/ryan.jpg',linkedin: '' },
      { name: 'Palash', role: 'Core Team',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Aman', role: 'Core Team',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Mahesh', role: 'Core Team',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Vedansh', role: 'Core Team',image: '/team/ryan.jpg', linkedin: '' },
      { name: 'Shantanu Barai', role: 'Core Team',image: '/team/ryan.jpg', linkedin: '' }
    ]
  });

  console.log('Team 2025 seeded');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
