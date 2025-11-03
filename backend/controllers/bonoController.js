const { BonusHunt, Bono } = require('../models');

async function create(req, res) {
  try {
    const bonusHuntId = req.params.id;
    const hunt = await BonusHunt.findOne({ where: { id: bonusHuntId, usuario_id: req.user.id } });
    if (!hunt) return res.status(404).json({ message: 'Bonus hunt no encontrado' });

    const { juego, proveedor, apuesta, ganancia, abierto } = req.body;
    const bono = await Bono.create({ bonus_hunt_id: bonusHuntId, juego, proveedor, apuesta: apuesta || 0, ganancia: ganancia || null, abierto: abierto === undefined ? true : !!abierto });
    return res.status(201).json({ bono });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creando bono', error: err.message });
  }
}

async function update(req, res) {
  try {
    const { id: bonusHuntId, bonoId } = req.params;
    const hunt = await BonusHunt.findOne({ where: { id: bonusHuntId, usuario_id: req.user.id } });
    if (!hunt) return res.status(404).json({ message: 'Bonus hunt no encontrado' });

    const bono = await Bono.findOne({ where: { id: bonoId, bonus_hunt_id: bonusHuntId } });
    if (!bono) return res.status(404).json({ message: 'Bono no encontrado' });

    const updates = req.body;
    const allowed = ['juego','proveedor','apuesta','ganancia','abierto'];
    for (const key of Object.keys(updates)) {
      if (allowed.includes(key)) bono[key] = updates[key];
    }
    await bono.save();
    return res.json({ bono });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error actualizando bono', error: err.message });
  }
}

async function remove(req, res) {
  try {
    const { id: bonusHuntId, bonoId } = req.params;
    const hunt = await BonusHunt.findOne({ where: { id: bonusHuntId, usuario_id: req.user.id } });
    if (!hunt) return res.status(404).json({ message: 'Bonus hunt no encontrado' });

    const bono = await Bono.findOne({ where: { id: bonoId, bonus_hunt_id: bonusHuntId } });
    if (!bono) return res.status(404).json({ message: 'Bono no encontrado' });

    await bono.destroy();
    return res.json({ message: 'Bono eliminado' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error eliminando bono', error: err.message });
  }
}

module.exports = { create, update, remove };
