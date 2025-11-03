const { BonusHunt, Bono } = require('../models');

async function list(req, res) {
  try {
    const hunts = await BonusHunt.findAll({ where: { usuario_id: req.user.id }, order: [['createdAt', 'DESC']] });
    return res.json({ bonusHunts: hunts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error listando bonus hunts', error: err.message });
  }
}

async function getOne(req, res) {
  try {
    const id = req.params.id;
    const hunt = await BonusHunt.findOne({ where: { id, usuario_id: req.user.id }, include: [{ model: Bono, as: 'bonos' }] });
    if (!hunt) return res.status(404).json({ message: 'Bonus hunt no encontrado' });
    return res.json({ bonusHunt: hunt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error obteniendo bonus hunt', error: err.message });
  }
}

async function create(req, res) {
  try {
    const { nombre, monto_inicial, fecha_inicio } = req.body;
    const hunt = await BonusHunt.create({ nombre, monto_inicial, fecha_inicio: fecha_inicio || new Date(), usuario_id: req.user.id });
    return res.status(201).json({ bonusHunt: hunt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creando bonus hunt', error: err.message });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const hunt = await BonusHunt.findOne({ where: { id, usuario_id: req.user.id } });
    if (!hunt) return res.status(404).json({ message: 'Bonus hunt no encontrado' });

    const updates = req.body;
    const allowed = ['nombre','fecha_inicio','fecha_fin','monto_inicial','monto_final','estado'];
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
