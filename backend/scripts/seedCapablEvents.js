// scripts/seedCapablEvents.js
require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('../models/Event');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Mongo connected');

  const events = [
  {
    title: 'Decoding Careers in Future of Mobility',
    type: 'workshop',                 // valid enum
    date: '2025-09-27',
    description:
      'Session on careers in EVs and autonomous vehicles: learn directly from a founder and explore hands-on projects to build in college.',
    prize: '',
    images: ['/events/future-mobility.jpg'], // optional
    isFeatured: true,
    link: ''
  },
  {
    title: 'AI Agents & The Future of Jobs',
    type: 'workshop',                 // also treat as workshop
    date: '2025-09-27',
    description:
      'Orientation session on AI agents, industry changes and how students can start building AI copilots during college.',
    prize: '',
    images: ['/events/ai-agents.jpg'], // optional
    isFeatured: true,
    link: ''
  },
   {
    title: 'Indian Racing Festival – Stunt & Drift Show',
    type: 'competition',                 // from enum
    date: '2025-04-20',
    description:
      'Stunt and drift show featuring Ft. Wolf and F4 race cars at the IITG swimming pool area.',
    prize: '',
    images: ['/events/indian-racing-festival.jpg'], // path where you serve this poster
    isFeatured: true,
    link: ''
  },
  {
    title: 'E-Drive: EV Industrial Training',
    type: 'workshop',                    // valid enum
    date: '2025-06-01',                  // pick an approximate start date
    description:
      'E-Drive industrial training program with mentors from leading EV and automotive companies, offering live mentorship, simulations, project-based learning and internships.',
    prize: '',
    images: ['/events/e-drive-training.jpg'], // where you host this poster
    isFeatured: true,
    link: ''                              // registration / info link if you have one
  },
  {
    title: 'Simscape Workshop',
    type: 'workshop',
    date: '2025-04-20',                  // adjust if needed
    description:
      'Hands-on Simscape workshop presented by MathWorks and IITG Racing for modelling and simulation of automotive systems.',
    prize: '',
    images: ['/events/simscape-workshop.jpg'],
    isFeatured: true,
    link: ''
  }
];

  // optional: clear old copies of same title
  const titles = events.map(e => e.title);
  await Event.deleteMany({ title: { $in: titles } });

  await Event.insertMany(events);
  console.log('Seeded Capabl events:', events.length);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
