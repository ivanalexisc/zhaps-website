async function me(req, res) {
  return res.json({ user: req.user });
}

module.exports = { me };
// For future user endpoints; currently used for /auth/me forwarding if needed
async function me(req, res) {
  return res.json({ user: req.user });
}

module.exports = { me };
