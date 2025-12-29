require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('../models/Team');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Mongo connected');

  const teams = [
    {
  year: 2024,
  name: 'IITG Racing',
  description: 'Leadership and subsystem heads of IITG Racing for the 2023–24 season.',
  members: [
    // leadership
    { name: 'Jash Muni', role: 'Chairperson', image: '/team2024/jash-muni.jpg', linkedin: '' },
    { name: 'Rishikesan S.', role: 'Secretary', image: '/team2024/rishikesan.jpg', linkedin: '' },
    { name: 'Paarth Kumar', role: 'Captain', image: '/team2024/paarth-kumar.jpg', linkedin: '' },
    { name: 'Divya Singh', role: 'Vice Captain', image: '/team2024/divya-singh.jpg', linkedin: '' },

    // marketing / design
    { name: 'Akshar Chauhan', role: 'Marketing Head', image: '/team2024/akshar-chauhan.jpg', linkedin: '' },
    { name: 'Om Gajjar', role: 'Design Head', image: '/team2024/om-gajjar.jpg', linkedin: '' },

    // operations / low voltage
    { name: 'Suvradeep', role: 'Operations Head', image: '/team2024/suvradeep.jpg', linkedin: '' },
    { name: 'Kavya Lamture', role: 'Low Voltage Head', image: '/team2024/kavya-lamture.jpg', linkedin: '' },

    // aero / chassis / HV / tractive / VD
    { name: 'Sanjay', role: 'Aerodynamics & Thermals Head', image: '/team2024/sanjay.jpg', linkedin: '' },
    { name: 'Kabang Chungkrang', role: 'Chassis & Bodyworks Head', image: '/team2024/kabang-chungkrang.jpg', linkedin: '' },
    { name: 'Rohan Sharma', role: 'High Voltage Head', image: '/team2024/rohan-sharma.jpg', linkedin: '' },
    { name: 'Nilanjan Das', role: 'Tractive Head', image: '/team2024/nilanjan-das.jpg', linkedin: '' },
    { name: 'Garima Sanjeev', role: 'VD & Suspension Head', image: '/team2024/garima-sanjeev.jpg', linkedin: '' },
    { name: 'Hrishikesh More', role: 'Steering & Brakes Head', image: '/team2024/hrishikesh-more.jpg', linkedin: '' },

    // core members shown in that carousel (example)
    { name: 'Aditya Singh', role: 'Core Team', image: '/team2024/aditya-singh.jpg', linkedin: '' },
    { name: 'Prashurjya Bhagawati', role: 'Core Team', image: '/team2024/prashurjya-bhagawati.jpg', linkedin: '' }
  ]
}
,

    {
  year: 2022,
  name: 'IITG Racing',
  description: 'Leadership team of IITG Racing for the 2023 season.',
  members: [
    // slide 1
    { name: 'Priyam Bhavsar', role: 'Secretary', image: '/team2023/priyam.jpg', linkedin: '' },
    { name: 'Aditya Bisla', role: 'Chairperson', image: '/team2023/aditya-bisla.jpg', linkedin: '' },
    { name: 'Gilkara Arnav Naidu', role: 'Captain', image: '/team2023/arnav.jpg', linkedin: '' },
    { name: 'Saarthak Sarkar', role: 'Vice Captain', image: '/team2023/saarthak.jpg', linkedin: '' },

    // slide 2
    { name: 'Avantee Balpande', role: 'Overall Coordinator', image: '/team2023/avantee.jpg', linkedin: '' },
    { name: 'Amon Poorekhorsandi', role: 'EV Coordinator', image: '/team2023/amon.jpg', linkedin: '' },
    { name: 'Shreerup Ikare', role: 'Events Head', image: '/team2023/shreerup.jpg', linkedin: '' },
    { name: 'Goutham Jyotilal', role: 'Marketing Head', image: '/team2023/goutham.jpg', linkedin: '' },

    // slide 3
    { name: 'Vivek Kumar', role: 'Engine, Drivetrain, Intake & Exhaust Head', image: '/team2023/vivek.jpg', linkedin: '' },
    { name: 'R Kailash', role: 'VD, DAQ and Electronics Head', image: '/team2023/kailash.jpg', linkedin: '' },
    { name: 'Nitesh Singh', role: 'Suspension, Brakes, Steering Head', image: '/team2023/nitesh.jpg', linkedin: '' },
    { name: 'Shobhit Sharma', role: 'Chassis, Aerodynamics and Radiator Head', image: '/team2023/shobhit.jpg', linkedin: '' }
  ]
},
{

  year: 2021,
  name: 'IITG Racing',
  description: 'Core and leadership team of IITG Racing for the 2021-22 season.',
  members: [
    { name: 'Durgansh Mishra', role: 'Secretary', image: '', linkedin: '' },
    { name: 'Shardul Shinde', role: 'Captain', image: '', linkedin: '' },
    { name: 'Shubham Panchal', role: 'Vice Captain', image: '', linkedin: '' },
    { name: 'Akshita Bhatt', role: 'Chairperson', image: '', linkedin: '' },
    { name: 'Shyam Sundar Chauhan', role: 'Project Manager', image: '', linkedin: '' },
    { name: 'M Sarim Ameed Khan', role: 'Overall Coordinator', image: '', linkedin: '' },
    { name: 'Nikhil Upadhyay', role: 'Events Head', image: '', linkedin: '' },
    { name: 'Sahaj Sethi', role: 'PR & Outreach Head', image: '', linkedin: '' },
    { name: 'Sanket Khairnar', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Mohammed Fahim', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Aditya Som', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Ujjwal Rustagi', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Ritesh Ranjan', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Snigdh Chandra', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Nikhil Kumar', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Saranyaa RT', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Yash Joshi', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Kancharla Varshith', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Abhinav Verma', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Sama Chandrahas Goud', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Vishal Yadav', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Kapil', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Pratyanshu Raj Singh', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Mohit Roshan', role: 'Core Team', image: '', linkedin: '' }
  ]
},
{
  year: 2020,
  name: 'IITG Racing',
  description: 'Core and leadership team of IITG Racing for the 2020-21 season.',
  members: [
    { name: 'Kartikey Kumar', role: 'Secretary', image: '', linkedin: '' },
    { name: 'Kunal Kandu', role: 'Captain', image: '', linkedin: '' },
    { name: 'Hitesh Yadav', role: 'Project Manager', image: '', linkedin: '' },
    { name: 'Yashwant Rawat', role: 'Chairperson', image: '', linkedin: '' },
    { name: 'Aditya Som', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Mohammed Fahim', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Vidya Sagar Vepa', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Ujjwal Rustagi', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Ashutosh Gupta', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Mitul Jinger', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Ritesh Ranjan', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Ankit Singh Rawat', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Manan Vora', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Durgansh Mishra', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Shardul Shinde', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Rushabh Parikh', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Khushi Meena', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Sanchit Sharma', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Upendra Kumar', role: 'Core Team', image: '', linkedin: '' },
    { name: 'M Sarim Ameed Khan', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Tanmay Sandbhor', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Priyanshu Bhanu', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Sitanshu Chaudhari', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Shubham Panchal', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Nitish Tripura', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Vishal Yadav', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Rahul Dewangan', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Pratyanshu Raj Singh', role: 'Core Team', image: '', linkedin: '' },
    { name: 'Shyam Sundar Chauhan', role: 'Core Team', image: '', linkedin: '' },
    { name: 'V Venu Madhav', role: 'Core Team', image: '', linkedin: '' }
  ]
},
{
  year: 2019,
  name: 'IITG Racing Alumni',
  description:
    'Former IITG Racing members now working in industry and academia across the globe.',
  members: [
    { name: 'Ananya Manohar', role: 'Alumni – Bajaj', image: '', linkedin: '' },
    { name: 'T Goutham Kumar Goud', role: 'Alumni', image: '', linkedin: '' },
    { name: 'Katana Sri Ajay', role: 'Alumni – EXL', image: '', linkedin: '' },
    { name: 'Thota Sai Vaishnav', role: 'Alumni – L&T', image: '', linkedin: '' },
    { name: 'Vishal Jamuar', role: 'Alumni', image: '', linkedin: '' },
    { name: 'Sadaival Singh', role: 'Alumni', image: '', linkedin: '' },
    { name: 'R Shreekavi', role: 'Alumni', image: '', linkedin: '' },
    { name: 'Ayush Kumar', role: 'Alumni – GMET at Jaguar Land Rover', image: '', linkedin: '' },
    { name: 'Himansh Mittal', role: 'Alumni – Product Analyst at Sprinklr', image: '', linkedin: '' },
    { name: 'Jatin Kumar Mangal', role: 'Alumni – Bajaj Auto Ltd.', image: '', linkedin: '' },
    { name: 'Yugam Jayant', role: 'Alumni – Data Scientist at Embibe', image: '', linkedin: '' },
    { name: 'Sudhanshu Verma', role: 'Alumni', image: '', linkedin: '' },
    { name: 'Aashit Rathore', role: 'Alumni – Graduate Research Assistant at McMaster University', image: '', linkedin: '' },
    { name: 'Akshat Mandloi', role: 'Alumni – AI Function Developer at Bosch', image: '', linkedin: '' },
    { name: 'Amandeep Sahu', role: 'Alumni – Senior Business Analyst at Shadowfax', image: '', linkedin: '' },
    { name: 'Ankur Shiledar', role: 'Alumni – Graduate Research Associate at The Ohio State University', image: '', linkedin: '' },
    { name: 'Bhaswati Gohain Barua', role: 'Alumni – Field Engineer at Schlumberger', image: '', linkedin: '' },
    { name: 'Nihar Bhardwaj', role: 'Alumni – Research Assistant at IIT Bombay', image: '', linkedin: '' },
    { name: 'Ronit Hire', role: 'Alumni – GSET at Jaguar Land Rover India', image: '', linkedin: '' },
    { name: 'Suraj Saroj', role: 'Alumni – Maintenance Officer at IOCL', image: '', linkedin: '' },
    { name: 'Aditya Kumar', role: 'Alumni – Senior Operations Engineer at IOCL', image: '', linkedin: '' },
    { name: 'Ajay Kumar Sandula', role: 'Alumni – Doctoral Researcher at IISc', image: '', linkedin: '' },
    { name: 'Akshay Pimpalkar', role: 'Alumni – MSc at Technical University of Munich', image: '', linkedin: '' },
    { name: 'Avdhoot Waghmode', role: 'Alumni – Management Consultant at PwC Consulting', image: '', linkedin: '' },
    { name: 'Hitansh Singhal', role: 'Alumni – Associate Body Structures Engineer at Rivian', image: '', linkedin: '' },
    { name: 'Mayank Thakur', role: 'Alumni – Manager at Reliance Industries Limited', image: '', linkedin: '' },
    { name: 'Vivek Sawarkar', role: 'Alumni – Senior Officer at Oil India Ltd.', image: '', linkedin: '' },
    { name: 'Anirudh Yadav', role: 'Alumni – PGP Batch 2020–22, IIM Bangalore', image: '', linkedin: '' },
    { name: 'Bhupendra Singh Dhaked', role: 'Alumni – DAQAS Officer, IES at Ministry of Defence', image: '', linkedin: '' },
    { name: 'Gaurav Agrawal', role: 'Alumni – Analyst at Goldman Sachs Private Equity', image: '', linkedin: '' },
    { name: 'Gaurav Gavaskar', role: 'Alumni – Assistant Executive Engineer at ONGC', image: '', linkedin: '' },
    { name: 'Karmesh Yadav', role: 'Alumni – Planning Engineer at ISEE', image: '', linkedin: '' },
    { name: 'Minkush Kansal', role: 'Alumni – PhD at University of Twente', image: '', linkedin: '' },
    { name: 'Parth Tiwari', role: 'Alumni – Spacecraft Structures Design Engineer at ISRO', image: '', linkedin: '' },
    { name: 'Rohit Murthy', role: 'Alumni – Autonomous Driving Engineer at NVIDIA', image: '', linkedin: '' },
    { name: 'Saanwra Khod', role: 'Alumni – Project Manager at Shyam Indus Power Solutions Pvt. Ltd.', image: '', linkedin: '' },
    { name: 'Sanjeev Kumar', role: 'Alumni – Aerospace Engineering at UIUC', image: '', linkedin: '' },
    { name: 'Shivam Lohia', role: 'Alumni – Technology Analyst at Citigroup', image: '', linkedin: '' },
    { name: 'Shobhit Gupta', role: 'Alumni – Research Aide Intern (PhD) at Argonne National Laboratory', image: '', linkedin: '' },
    { name: 'Akash Boddeda', role: 'Alumni – GET at General Motors', image: '', linkedin: '' },
    { name: 'Anmol Mukati', role: 'Alumni – Assistant Manager at Maruti Suzuki India Limited', image: '', linkedin: '' },
    { name: 'Naman Kansal', role: 'Alumni – Supply Chain Manager at Nykaa.com', image: '', linkedin: '' },
    { name: 'Saurabh Samant', role: 'Alumni – CAE Analyst at Mercedes Benz', image: '', linkedin: '' },
    { name: 'Kaushal Kamal Jain', role: 'Alumni – PhD Student at Herrick Lab, Purdue University', image: '', linkedin: '' },
    { name: 'Puru Rastogi', role: 'Alumni – Co-Founder at Mowito', image: '', linkedin: '' },
    { name: 'Amol Lanjewar', role: 'Alumni – Assistant Engineer at ONGC', image: '', linkedin: '' },
    { name: 'Ravish Vasan', role: 'Alumni – Founder at Sattvam', image: '', linkedin: '' },
    { name: 'Sanjay Kumar Jauhar', role: 'Alumni – Senior Engineer at Aeronautical Development Agency', image: '', linkedin: '' }
  ]
}


  ];

  for (const t of teams) {
    await Team.deleteOne({ year: t.year });
    await Team.create(t);
    console.log('Seeded team', t.year);
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
