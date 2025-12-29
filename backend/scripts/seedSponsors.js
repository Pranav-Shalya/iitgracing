require('dotenv').config();
const mongoose = require('mongoose');
const Sponsor = require('../models/Sponsor');

const sponsors = [
  {
    name: 'Technology Innovation Hub IITG TIDF',
    type: 'title',
    year: 2025,
    logo: '/sponsors/tih-iitg.png',
    website: '',
    description: 'Title sponsor of IITG Racing for the 2025 season.'
  },
  {
    name: 'Bender',
    type: 'financial',          // Gold Sponsor
    year: 2025,
    logo: '/sponsors/bender.png',
    website: '',
    description: 'Gold financial sponsor supporting vehicle development.'
  },
  {
    name: 'Technical Board IIT Guwahati',
    type: 'financial',          // Gold Sponsor
    year: 2025,
    logo: '/sponsors/tech-board.png',
    website: '',
    description: 'Gold sponsor from the IITG student technical board.'
  },
  {
    name: 'Zuken',
    type: 'technical',          // Software Sponsor
    year: 2025,
    logo: '/sponsors/zuken.png',
    website: '',
    description: 'Software sponsor for PCB and wiring design tools.'
  },
  {
    name: 'Lotus',
    type: 'technical',
    year: 2025,
    logo: '/sponsors/lotus.png',
    website: '',
    description: 'Software sponsor for suspension and vehicle dynamics.'
  },
  {
    name: 'Rapid Harness',
    type: 'technical',
    year: 2025,
    logo: '/sponsors/rapidharness.png',
    website: '',
    description: 'Software sponsor for wiring harness design.'
  },
  {
    name: 'SolidWorks',
    type: 'technical',
    year: 2025,
    logo: '/sponsors/solidworks.png',
    website: '',
    description: 'Software sponsor for CAD and mechanical design.'
  },
  {
    name: 'Altair',
    type: 'technical',
    year: 2025,
    logo: '/sponsors/altair.png',
    website: '',
    description: 'Software sponsor for CAE and simulation tools.'
  },
  {
    name: 'Ansys',
    type: 'technical',
    year: 2025,
    logo: '/sponsors/ansys.png',
    website: '',
    description: 'Software sponsor for FEA and CFD simulation.'
  },
  {
    name: 'MathWorks',
    type: 'technical',
    year: 2025,
    logo: '/sponsors/mathworks.png',
    website: '',
    description: 'Software sponsor for control and simulation (MATLAB/Simulink).'
  },
  {
    name: 'Flauta Customs',
    type: 'financial',          // Bronze Sponsor
    year: 2025,
    logo: '/sponsors/flauta-customs.png',
    website: '',
    description: 'Bronze sponsor supporting fabrication and branding.'
  },
  {
    name: 'PCB Power',
    type: 'financial',          // Bronze Sponsor
    year: 2025,
    logo: '/sponsors/pcb-power.png',
    website: '',
    description: 'Bronze sponsor for PCB manufacturing.'
  }
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Mongo connected');

  // optional: clear only 2025 sponsors before re‑seeding
  await Sponsor.deleteMany({ year: 2025 });

  await Sponsor.insertMany(sponsors);
  console.log('Sponsors seeded:', sponsors.length);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
