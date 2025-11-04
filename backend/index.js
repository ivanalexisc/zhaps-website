const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const { sequelize } = require('./models');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const bonusHuntRoutes = require('./routes/bonusHunts');
const bonusesRoutes = require('./routes/bonuses');

app.use('/auth', authRoutes);
app.use('/bonus-hunts', bonusHuntRoutes);
app.use('/bonus-hunts/:id/bonuses', bonusesRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'Zhaps backend running' }));

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connection OK');
  } catch (err) {
    console.error('Unable to connect to DB:', err.message);
  }

  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

start();

