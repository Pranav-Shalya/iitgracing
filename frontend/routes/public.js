// routes/public.js
const express = require('express');
const Car = require('../models/Car');
const Team = require('../models/Team');
const Event = require('../models/Event');
const Competition = require('../models/Competition');
const Sponsor = require('../models/Sponsor');

const router = express.Router();

router.get('/home', async (req, res) => {
  try {
    const latestCars = await Car.find().sort({ year: -1 }).limit(3);
    const currentTeam = await Team.findOne().sort({ year: -1 });
    const featuredEvents = await Event.find({ isFeatured: true }).sort({ date: -1 }).limit(3);
    const sponsors = await Sponsor.find().sort({ year: -1 });
    const competitions = await Competition.find().sort({ year: -1 }).limit(6);
    res.json({ latestCars, currentTeam, featuredEvents, sponsors, competitions });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/cars', async (req, res) => {
  const cars = await Car.find().sort({ year: -1 });
  res.json(cars);
});

router.get('/teams', async (req, res) => {
  const teams = await Team.find().sort({ year: -1 });
  res.json(teams);
});

router.get('/events', async (req, res) => {
  const events = await Event.find().sort({ date: -1 });
  res.json(events);
});

router.get('/competitions', async (req, res) => {
  const comps = await Competition.find().sort({ year: -1 });
  res.json(comps);
});

router.get('/sponsors', async (req, res) => {
  const sponsors = await Sponsor.find().sort({ year: -1 });
  res.json(sponsors);
});

module.exports = router;
