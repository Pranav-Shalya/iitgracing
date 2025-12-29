require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('../models/Car');  // ✅ Fixed path

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Mongo connected');

  const cars = [
    // ORIGIN (2015)
    {
      name: 'Origin',
      slug: 'origin',
      category: 'formula',
      year: 2015,
      titleLine: 'First IITG Racing Formula Car',
      descriptionTop: 'This is a formula style car designed keeping in mind SUPRA 2015. It was the first racing car manufactured by our club, which came with its own ups and downs. We stood at 67th position among the 167 teams that participated in the competition at the Madras Motor Track.',
      descriptionBottom: 'The car was designed to reach speeds up to 115 kmph powered by a Honda CBR 600cc engine with max torque of 66 Nm. It reached 0–100 kmph in 14.5 seconds. The car initially had a green body, but after the competition the team updated the design and switched to a red‑black body.',
      specs: { maxSpeedKmph: 115, engine: 'Honda CBR 600 cc', torqueNm: 66 },
      images: [
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800'
      ],
      highlights: [
        '• 67th position among 167 teams at SUPRA 2015',
        '• First IITG Racing formula car',
        '• Honda CBR 600cc engine',
        '• 0-100 kmph in 14.5 seconds'
      ],
      designNotes: 'Initial green body switched to red-black post-competition. Focus on reliability and learning experience.'
    },
    // TACHYON 1.0 (2016)
    {
      name: 'Tachyon 1.0',
      slug: 'tachyon1',
      category: 'formula',
      year: 2016,
      titleLine: 'Named after faster-than-light particles',
      descriptionTop: 'With experience from manufacturing Origin, we started building this car in 2015 and completed it at the end of 2016 just in time for SUPRA 2016. We also took this car to Formula Bharat 2017, where it ranked 21st. It is named after Tachyon, hypothetical particles that travel faster than light.',
      descriptionBottom: 'This car clocked speeds up to 120 kmph powered by a Honda CBR 600cc engine with max torque of 66 Nm, reaching 0–60 kmph in about 5–6 seconds. Fabricated using fibre reinforced plastic and running Hoosier tyres, it was an absolute beast on track and was also showcased in Techevince.',
      specs: { maxSpeedKmph: 120, engine: 'Honda CBR 600 cc', torqueNm: 66 },
      images: [
        'https://images.unsplash.com/photo-1558618047-3c8c76ca335e?w=800',
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800'
      ],
      highlights: [
        '• 21st rank at Formula Bharat 2017',
        '• Fibre reinforced plastic body',
        '• Hoosier racing tyres',
        '• 0-60 kmph in 5-6 seconds'
      ],
      designNotes: 'Showcased at Techevince. Significant improvement over Origin.'
    },
    // TACHYON 2.0 (2020)
    {
      name: 'Tachyon 2.0',
      slug: 'tachyon2',
      category: 'formula',
      year: 2020,
      titleLine: 'Compact engine, agile performance',
      descriptionTop: 'The second formula‑style car, its manufacturing started in 2018 building on the experience from Tachyon 1.0. This car was built for Formula Bharat 2020 but could not reach the competition on time due to logistics issues.',
      descriptionBottom: 'This time the team chose a smaller engine, a KTM RC 390 cc, which powered the car to a maximum speed of around 80 kmph. The body was grey fibre‑reinforced plastic and the car ran Hoosier 10.0x6.0‑18 tyres.',
      specs: { maxSpeedKmph: 80, engine: 'KTM RC 390 cc' },
      images: ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800'],
      highlights: [
        '• KTM RC 390cc engine',
        '• Grey FRP body',
        '• Hoosier 10.0x6.0-18 tyres',
        '• Logistics prevented competition'
      ],
      designNotes: 'Smaller engine choice for better handling and agility.'
    },
    // TACHYON 3.0 (2021)
    {
      name: 'Tachyon 3.0',
      slug: 'tachyon3',
      category: 'formula',
      year: 2021,
      titleLine: 'Aerodynamics + Chassis evolution',
      descriptionTop: 'The third iteration of our formula student car, building on lessons from Tachyon 1.0 and 2.0. Designed for Formula Bharat competitions with improved aerodynamics and chassis dynamics.',
      descriptionBottom: 'Powered by an optimized engine setup with enhanced transmission and suspension. Focused on better track performance and reliability over previous iterations.',
      specs: { maxSpeedKmph: 95, engine: 'Honda CBR 600 cc (optimized)', torqueNm: 68 },
      images: ['https://images.unsplash.com/photo-1558618047-3c8c76ca335e?w=800'],
      highlights: [
        '• Improved aerodynamics',
        '• Enhanced chassis dynamics',
        '• Optimized transmission',
        '• Better track reliability'
      ],
      designNotes: 'Focus on iterative improvements from previous generations.'
    },
    // EFFICYCLE 1.0 (2017)
    {
      name: 'Efficycle 1.0',
      slug: 'effi1',
      category: 'efficycle',
      year: 2017,
      titleLine: 'First hybrid efficiency racer',
      descriptionTop: 'Our first entry into the Efficycle competition, focusing on human-electric hybrid powertrains for maximum efficiency.',
      descriptionBottom: 'Designed for the national Efficycle championship with emphasis on lightweight construction and energy optimization.',
      specs: { maxSpeedKmph: 35, engine: 'BLDC Motor + Human Pedal Assist' },
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
      highlights: [
        '• First Efficycle entry',
        '• Human-electric hybrid',
        '• Lightweight construction',
        '• Energy optimization focus'
      ],
      designNotes: 'Entry-level design for efficiency competitions.'
    },
    // EFFICYCLE 2.0 (2018)
    {
      name: 'Efficycle 2.0',
      slug: 'effi2',
      category: 'efficycle',
      year: 2018,
      titleLine: 'Battery management upgrade',
      descriptionTop: 'Improved version with better battery management and aerodynamic fairing compared to Efficycle 1.0.',
      descriptionBottom: 'Enhanced motor controller and lighter frame materials contributed to better endurance and efficiency scores.',
      specs: { maxSpeedKmph: 38, engine: 'BLDC Motor + Optimized Pedal Assist' },
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
      highlights: [
        '• Better battery management',
        '• Aerodynamic fairing',
        '• Lighter frame materials',
        '• Improved endurance'
      ],
      designNotes: 'Significant efficiency improvements over v1.0.'
    },
    // EFFICYCLE 3.0 (2019)
    {
      name: 'Efficycle 3.0',
      slug: 'effi3',
      category: 'efficycle',
      year: 2019,
      titleLine: 'Advanced powertrain efficiency',
      descriptionTop: 'Third generation with significant improvements in powertrain efficiency and rider ergonomics.',
      descriptionBottom: 'Featured advanced battery cooling and custom-designed fairing for drag reduction. Competed in national championships.',
      specs: { maxSpeedKmph: 42, engine: 'High-efficiency BLDC Motor' },
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
      highlights: [
        '• Advanced battery cooling',
        '• Custom drag-reduction fairing',
        '• National championship competitor',
        '• Rider ergonomics focus'
      ],
      designNotes: 'Peak efficiency design with competition experience.'
    },
    // EFFICYCLE 4.0 (2020)
    {
      name: 'Efficycle 4.0',
      slug: 'effi4',
      category: 'efficycle',
      year: 2020,
      titleLine: 'IoT-enabled performance',
      descriptionTop: 'Latest Efficycle with cutting-edge battery technology and IoT-based performance monitoring.',
      descriptionBottom: 'Incorporates real-time telemetry and adaptive power management for optimal race performance.',
      specs: { maxSpeedKmph: 45, engine: 'Next-gen BLDC with IoT' },
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
      highlights: [
        '• IoT performance monitoring',
        '• Real-time telemetry',
        '• Adaptive power management',
        '• Cutting-edge battery tech'
      ],
      designNotes: 'Technology-forward design with smart features.'
    },
    // BAJA SRIJAN (2022)
    {
      name: 'Baja Srijan',
      slug: 'baja',
      category: 'baja',
      year: 2022,
      titleLine: 'All-terrain SAE warrior',
      descriptionTop: 'All-terrain Baja SAE vehicle designed for rugged off-road challenges. Competed in national finals.',
      descriptionBottom: 'Built for extreme durability with tubular chassis, independent suspension, and CVT transmission.',
      specs: { maxSpeedKmph: 60, engine: '350cc Manual Gearbox', torqueNm: 28 },
      images: ['https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800'],
      highlights: [
        '• National finals competitor',
        '• Tubular chassis design',
        '• Independent suspension',
        '• CVT transmission'
      ],
      designNotes: 'Built for extreme durability and off-road performance.'
    },
    // CONCEPT A (2023)
    {
      name: 'Concept A',
      slug: 'conceptA',
      category: 'concept',
      year: 2023,
      titleLine: 'Experimental prototype',
      descriptionTop: 'Experimental concept vehicle exploring innovative chassis and suspension designs.',
      descriptionBottom: 'Proof-of-concept prototype testing next-generation materials and manufacturing techniques.',
      specs: { engine: 'Prototype' },
      images: ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'],
      highlights: [
        '• Next-gen materials testing',
        '• Innovative chassis design',
        '• Suspension R&D prototype',
        '• Proof-of-concept vehicle'
      ],
      designNotes: 'Pure research and development platform.'
    },
    // VISION F (2024)
    {
      name: 'Vision F',
      slug: 'visionf',
      category: 'concept',
      year: 2024,
      titleLine: 'Future of student formula',
      descriptionTop: 'Future-oriented concept car showcasing electric powertrain integration and advanced driver aids.',
      descriptionBottom: 'Vision for next-generation student formula with hybrid power and autonomous features.',
      specs: { engine: 'Hybrid Electric Prototype' },
      images: ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'],
      highlights: [
        '• Hybrid electric powertrain',
        '• Advanced driver aids',
        '• Autonomous feature testing',
        '• Next-gen formula vision'
      ],
      designNotes: 'Forward-looking design with hybrid and smart tech.'
    }
  ];

  // Clear existing cars and seed new ones
  await Car.deleteMany({});
  
  for (const car of cars) {
    await Car.create(car);
  }

  console.log('✅ Seeded 11 cars successfully!');
  console.log('📊 Formula:', cars.filter(c => c.category === 'formula').length);
  console.log('📊 Efficycle:', cars.filter(c => c.category === 'efficycle').length);
  console.log('📊 Baja:', cars.filter(c => c.category === 'baja').length);
  console.log('📊 Concept:', cars.filter(c => c.category === 'concept').length);

  await mongoose.connection.close();
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
