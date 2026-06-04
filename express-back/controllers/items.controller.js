const db = require('../database/db');

const getAll = (req, res) => {
  const rows = db.prepare('SELECT * FROM items').all();
  res.json(rows);
};

const getById = (req, res) => {
  const row = db.prepare('SELECT * FROM items WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ message: 'Non trouvé' });
  res.json(row);
};

const create = (req, res) => {
  const { nom, description } = req.body;
  const result = db.prepare('INSERT INTO items (nom, description) VALUES (?, ?)').run(nom, description);
  res.status(201).json({ id: result.lastInsertRowid, nom, description });
};

const update = (req, res) => {
  const { nom, description } = req.body;
  db.prepare('UPDATE items SET nom = ?, description = ? WHERE id = ?').run(nom, description, req.params.id);
  res.json({ message: 'Mis à jour' });
};

const remove = (req, res) => {
  db.prepare('DELETE FROM items WHERE id = ?').run(req.params.id);
  res.json({ message: 'Supprimé' });
};

module.exports = { getAll, getById, create, update, remove };