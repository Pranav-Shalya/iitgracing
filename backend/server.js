require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const teamRoutes = require('./routes/teams');
const sponsorRoutes = require('./routes/sponsors');
const competitionRoutes = require('./routes/competitions');
const eventRoutes = require('./routes/events');
const publicRoutes = require('./routes/public');
const { auth } = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/public/cars', require('./routes/cars'));     
app.use('/api/public/teams', auth, require('./routes/teams'));
app.use('/api/cars', carRoutes);                          // Admin
app.use('/api/teams', teamRoutes);       
app.use('/api/sponsors', auth, sponsorRoutes);
app.use('/api/competitions', auth, competitionRoutes);
app.use('/api/events', auth, eventRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
