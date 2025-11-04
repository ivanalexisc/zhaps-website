const { BonusHunt, Bonus } = require('../models');
const { v4: uuidv4 } = require('uuid');

async function list(req, res) {
  try {
    const hunts = await BonusHunt.findAll({ 
      where: { userId: req.user.id }, 
      order: [['createdAt', 'DESC']],
      include: [{ model: Bonus, as: 'bonuses' }]
    });
    return res.json({ bonusHunts: hunts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error listing bonus hunts', error: err.message });
  }
}

async function getOne(req, res) {
  try {
    const id = req.params.id;
    const hunt = await BonusHunt.findOne({ 
      where: { id, userId: req.user.id }, 
      include: [{ model: Bonus, as: 'bonuses' }] 
    });
    if (!hunt) return res.status(404).json({ message: 'Bonus hunt not found' });
    return res.json({ bonusHunt: hunt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error getting bonus hunt', error: err.message });
  }
}

async function create(req, res) {
  try {
    const { startBalance } = req.body;
    const hunt = await BonusHunt.create({ 
      id: uuidv4(),
      date: new Date(), 
      startBalance, 
      isFinished: false,
      userId: req.user.id 
    });
    return res.status(201).json({ bonusHunt: hunt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating bonus hunt', error: err.message });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const hunt = await BonusHunt.findOne({ where: { id, userId: req.user.id } });
    if (!hunt) return res.status(404).json({ message: 'Bonus hunt not found' });

    const updates = req.body;
    const allowed = ['date', 'startBalance', 'isFinished'];
    for (const key of Object.keys(updates)) {
      if (allowed.includes(key)) hunt[key] = updates[key];
    }
    await hunt.save();
    return res.json({ bonusHunt: hunt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error actualizando bonus hunt', error: err.message });
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    const hunt = await BonusHunt.findOne({ where: { id, usuario_id: req.user.id } });
    if (!hunt) return res.status(404).json({ message: 'Bonus hunt no encontrado' });

    hunt.estado = 'cancelado';
    await hunt.save();
    return res.json({ message: 'Bonus hunt marcado como cancelado', bonusHunt: hunt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error eliminando bonus hunt', error: err.message });
  }
}

module.exports = { list, getOne, create, update, remove };
