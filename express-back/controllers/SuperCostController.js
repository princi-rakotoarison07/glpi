const db = require('../database/db');

exports.saveSuperCost = (req, res) => {
  const { ticket_id, super_cost } = req.body;

  if (!ticket_id || super_cost === undefined) {
    return res.status(400).json({ error: 'ticket_id and super_cost are required' });
  }

  try {
    const stmt = db.prepare('INSERT OR REPLACE INTO super_cost (ticket_id, super_cost) VALUES (?, ?)');
    stmt.run(ticket_id, super_cost);
    res.status(200).json({ message: 'Super cost saved successfully', ticket_id, super_cost });
  } catch (error) {
    console.error('Error saving super cost:', error);
    res.status(500).json({ error: 'Failed to save super cost' });
  }
};

exports.getAllSuperCosts = (req, res) => {
  try {
    const stmt = db.prepare('SELECT ticket_id, super_cost FROM super_cost');
    const results = stmt.all();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error getting all super costs:', error);
    res.status(500).json({ error: 'Failed to get super costs' });
  }
};

exports.getSuperCost = (req, res) => {
  const { ticket_id } = req.params;

  try {
    const stmt = db.prepare('SELECT super_cost FROM super_cost WHERE ticket_id = ?');
    const result = stmt.get(ticket_id);
    
    if (result) {
      res.status(200).json({ super_cost: result.super_cost });
    } else {
      res.status(404).json({ error: 'Super cost not found for this ticket' });
    }
  } catch (error) {
    console.error('Error getting super cost:', error);
    res.status(500).json({ error: 'Failed to get super cost' });
  }
};

exports.deleteSuperCost = (req, res) => {
  const { ticket_id } = req.params;
  try {
    const stmt = db.prepare('DELETE FROM super_cost WHERE ticket_id = ?');
    stmt.run(ticket_id);
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.saveReopenCost = (req, res) => {
  const { ticket_id, percentage } = req.body;
  try {
    const stmt = db.prepare('SELECT super_cost FROM super_cost WHERE ticket_id = ?');
    const result = stmt.get(ticket_id);
    if (result) {
      const reopen_cost = result.super_cost * (percentage / 100);
      const insertStmt = db.prepare('INSERT OR REPLACE INTO ticket_reopen_cost (ticket_id, reopen_cost) VALUES (?, ?)');
      insertStmt.run(ticket_id, reopen_cost);
      res.status(200).json({ reopen_cost });
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.getAllReopenCosts = (req, res) => {
  try {
    const stmt = db.prepare('SELECT ticket_id, reopen_cost FROM ticket_reopen_cost');
    const results = stmt.all();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load ' });
  }
}
