const express = require('express');
const Car = require('../models/Car');
const router = express.Router();

// ✅ SLUG HELPER
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ✅ PUBLIC ROUTES
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().sort({ year: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/grouped', async (req, res) => {
  try {
    const cars = await Car.find().sort({ year: 1 });
    const grouped = {
      formula: cars.filter(c => c.category === 'formula'),
      efficycle: cars.filter(c => c.category === 'efficycle'),
      baja: cars.filter(c => c.category === 'baja'),
      concept: cars.filter(c => c.category === 'concept')
    };
    res.json(grouped);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const car = await Car.findOne({ slug: req.params.slug });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ CREATE CAR (UNIQUE SLUG)
router.post('/', async (req, res) => {
  try {
    let slug = req.body.slug || generateSlug(req.body.name);
    
    // ✅ MAKE SLUG UNIQUE
    let counter = 1;
    let uniqueSlug = slug;
    while (await Car.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter++}`;
    }
    
    const carData = {
      ...req.body,
      slug: uniqueSlug
    };
    
    const car = new Car(carData);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.error('POST Error:', error);
    res.status(400).json({ error: error.message });
  }
});

// ✅ UPDATE CAR
router.put('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (error) {
    console.error('PUT Error:', error);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
