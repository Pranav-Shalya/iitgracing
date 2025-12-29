require('dotenv').config();
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';
const ADMIN_EMAIL = 'admin@iitgracing.com';
const ADMIN_PASSWORD = 'password123';

const cars = [
  {
    name: 'Srijan',
    year: 2012,
    type: 'ICE',
    description: 'First BAJA ATV that reached national finals.',
    specs: { engine: '340cc', topSpeed: 56.25, chassis: 'AISI 1020' }
  },
  // TODO: add other cars from IITG Racing “Our Cars” page.
];

const competitions = [
  {
    name: 'BAJA SAE 2012',
    year: 2012,
    type: 'BAJA',
    position: 'Finalist',
    description: 'Srijan competed at BAJA SAE India 2012.'
  },
  // Add Supra, Formula Bharat, etc.
];

async function main() {
  const loginRes = await axios.post(`${API_BASE}/auth/login`, {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });
  const token = loginRes.data.token;
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  // Seed cars
  for (const car of cars) {
    await axios.post(`${API_BASE}/cars`, car, auth);
    console.log('Added car:', car.name);
  }

  // Seed competitions
  for (const comp of competitions) {
    await axios.post(`${API_BASE}/competitions`, comp, auth);
    console.log('Added competition:', comp.name);
  }

  console.log('Done.');
}

main().catch(err => {
  console.error(err.response?.data || err.message);
});
