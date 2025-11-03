const { sequelize } = require('../models');

async function sync() {
  try {
    await sequelize.sync({ alter: true });
    console.log('DB schema synced (alter: true)');
    process.exit(0);
  } catch (err) {
    console.error('Sync failed', err);
    process.exit(1);
  }
}

sync();

