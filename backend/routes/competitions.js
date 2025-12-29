const express = require('express');
const Competition = require('../models/Competition');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const competitions = await Competition.find().populate('cars').sort({ year: -1 });
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const competition = new Competition(req.body);
    await competition.save();
    res.status(201).json(competition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const competition = await Competition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(competition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Competition.findByIdAndDelete(req.params.id);
    res.json({ message: 'Competition deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
