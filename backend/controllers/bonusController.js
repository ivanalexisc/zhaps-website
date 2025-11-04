const { BonusHunt, Bonus } = require('../models');

async function create(req, res) {
  try {
    const bonusHuntId = req.params.id;
    const hunt = await BonusHunt.findOne({ where: { id: bonusHuntId, userId: req.user.id } });
    if (!hunt) return res.status(404).json({ message: 'Bonus hunt not found' });

    const { slotName, bet, multiplier, win, status } = req.body;
    const bonus = await Bonus.create({ 
      bonusHuntId, 
      slotName, 
      bet: bet || 0, 
      multiplier: multiplier || null, 
      win: win || null, 
      status: status || 'Pending' 
    });
    return res.status(201).json({ bonus });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating bonus', error: err.message });
  }
}

async function update(req, res) {
  try {
    const { id: bonusHuntId, bonusId } = req.params;
    const hunt = await BonusHunt.findOne({ where: { id: bonusHuntId, userId: req.user.id } });
    if (!hunt) return res.status(404).json({ message: 'Bonus hunt not found' });

    const bonus = await Bonus.findOne({ where: { id: bonusId, bonusHuntId } });
    if (!bonus) return res.status(404).json({ message: 'Bonus not found' });

    const updates = req.body;
    const allowed = ['slotName', 'bet', 'multiplier', 'win', 'status'];
    for (const key of Object.keys(updates)) {
      if (allowed.includes(key)) bonus[key] = updates[key];
    }
    await bonus.save();
    return res.json({ bonus });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating bonus', error: err.message });
  }
}

async function remove(req, res) {
  try {
    const { id: bonusHuntId, bonusId } = req.params;
    const hunt = await BonusHunt.findOne({ where: { id: bonusHuntId, userId: req.user.id } });
    if (!hunt) return res.status(404).json({ message: 'Bonus hunt not found' });

    const bonus = await Bonus.findOne({ where: { id: bonusId, bonusHuntId } });
    if (!bonus) return res.status(404).json({ message: 'Bonus not found' });

    await bonus.destroy();
    return res.json({ message: 'Bonus deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting bonus', error: err.message });
  }
}

module.exports = {
  create,
  update,
  remove
};