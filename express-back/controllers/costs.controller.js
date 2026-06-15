const db = require('../database/db');

const handle = (res, fn) => {
  try { fn(); }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } 
};

const getCosts = (req, res) => handle(res, () => {
  res.json(db.prepare('SELECT * FROM couts').all());
});

const createCost = (req, res) => handle(res, () => {
  const { id_ticket, superCost = 0, coutReouverture = 0 } = req.body;
  const result = db.prepare('INSERT INTO couts (id_ticket, superCost, coutReouverture) VALUES (?, ?, ?)').run(id_ticket, superCost, coutReouverture);
  res.json({ id: result.lastInsertRowid, id_ticket, superCost, coutReouverture });
});

const getCostByTicketId = (req, res) => handle(res, () => {
  const cost = db.prepare('SELECT * FROM couts WHERE id_ticket = ? ORDER BY id DESC LIMIT 1').get(req.params.id);
  res.json(cost || null);
});

const deleteCostByTicketId = (req, res) => handle(res, () => {
  const result = db.prepare('DELETE FROM couts WHERE id = (SELECT MAX(id) FROM couts WHERE id_ticket = ?)').run(req.params.id);
  res.json({ deleted: result.changes > 0 });
});

const updateCostReouverture = (req, res) => handle(res, () => {
  const result = db.prepare('UPDATE couts SET coutReouverture = ? WHERE id = (SELECT MAX(id) FROM couts WHERE id_ticket = ?)').run(req.body.coutReouverture || 0, req.params.id);
  res.json({ updated: result.changes > 0 });
});

module.exports = {
  getCosts,
  createCost,
  getCostByTicketId,
  deleteCostByTicketId,
  updateCostReouverture
};
