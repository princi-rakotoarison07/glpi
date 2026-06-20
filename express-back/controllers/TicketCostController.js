const db = require('../database/db');

exports.saveSuperCost = (req, res) => {
  const { ticket_id, super_cost, id_item, id_category, group_id } = req.body;

  if (!ticket_id || super_cost === undefined) {
    return res.status(400).json({ error: 'ticket_id and super_cost are required' });
  }

  try {
    const stmt = db.prepare('INSERT INTO ticket_costs (id_ticket, type_cout, cout, id_item, id_category, group_id) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(ticket_id, 'super_cost', super_cost, id_item || null, id_category || null, group_id || null);
    res.status(200).json({ message: 'Super cost saved successfully', ticket_id, super_cost });
  } catch (error) {
    console.error('Error saving super cost:', error);
    res.status(500).json({ error: 'Failed to save super cost', details: error.message });
  }
};

exports.getAllSuperCosts = (req, res) => {
  try {
    const stmt = db.prepare('SELECT id_ticket as ticket_id, cout as super_cost FROM ticket_costs WHERE type_cout = ?');
    const results = stmt.all('super_cost');
    res.status(200).json(results);
  } catch (error) {
    console.error('Error getting all super costs:', error);
    res.status(500).json({ error: 'Failed to get super costs' });
  }
};

exports.getSuperCost = (req, res) => {
  const { ticket_id } = req.params;

  try {
    const stmt = db.prepare('SELECT SUM(cout) as total_super_cost FROM ticket_costs WHERE id_ticket = ? AND type_cout = ?');
    const result = stmt.get(ticket_id, 'super_cost');
    
    if (result && result.total_super_cost !== null) {
      res.status(200).json({ super_cost: result.total_super_cost });
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
    const lastStmt = db.prepare('SELECT id, group_id FROM ticket_costs WHERE id_ticket = ? AND type_cout = ? ORDER BY id DESC LIMIT 1');
    const lastRow = lastStmt.get(ticket_id, 'super_cost');
    
    if (lastRow) {
      if (lastRow.group_id) {
        const deleteStmt = db.prepare('DELETE FROM ticket_costs WHERE group_id = ? AND id_ticket = ? AND type_cout = ?');
        deleteStmt.run(lastRow.group_id, ticket_id, 'super_cost');
      } else {
        const deleteStmt = db.prepare('DELETE FROM ticket_costs WHERE id = ?');
        deleteStmt.run(lastRow.id);
      }
    }
    res.status(200).json({ message: 'Deleted last super cost' });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.saveReopenCost = (req, res) => {
  const { ticket_id, percentage, id_item, id_category, group_id } = req.body;
  try {
    const stmt = db.prepare('SELECT cout FROM ticket_costs WHERE id_ticket = ? AND type_cout = ? ORDER BY id DESC LIMIT 1');
    const result = stmt.get(ticket_id, 'super_cost');
    if (result && result.cout !== null) {
      const reopen_cost = result.cout * (percentage / 100);
      const insertStmt = db.prepare('INSERT INTO ticket_costs (id_ticket, type_cout, cout, id_item, id_category, group_id) VALUES (?, ?, ?, ?, ?, ?)');
      insertStmt.run(ticket_id, 'reopen_cost', reopen_cost, id_item || null, id_category || null, group_id || null);
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
    const stmt = db.prepare('SELECT id_ticket as ticket_id, cout as reopen_cost FROM ticket_costs WHERE type_cout = ?');
    const results = stmt.all('reopen_cost');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load ' });
  }
};

exports.calculateBaseCost = (req, res) => {
  const { ticket_id, mode } = req.params;
  const modeInt = parseInt(mode, 10);
  
  try {
    let base_cost = 0;
    
    if (modeInt === 1) { // Dernier super cost
      const lastRow = db.prepare("SELECT group_id, cout FROM ticket_costs WHERE id_ticket = ? AND type_cout = 'super_cost' ORDER BY id DESC LIMIT 1").get(ticket_id);
      if (lastRow) {
        if (lastRow.group_id) {
          base_cost = db.prepare("SELECT SUM(cout) as total FROM ticket_costs WHERE group_id = ? AND type_cout = 'super_cost'").get(lastRow.group_id).total;
        } else {
          base_cost = lastRow.cout;
        }
      }
    } else if (modeInt === 2) { // Premier super cost
      const firstRow = db.prepare("SELECT group_id, cout FROM ticket_costs WHERE id_ticket = ? AND type_cout = 'super_cost' ORDER BY id ASC LIMIT 1").get(ticket_id);
      if (firstRow) {
        if (firstRow.group_id) {
          base_cost = db.prepare("SELECT SUM(cout) as total FROM ticket_costs WHERE group_id = ? AND type_cout = 'super_cost'").get(firstRow.group_id).total;
        } else {
          base_cost = firstRow.cout;
        }
      }
    } else if (modeInt === 3) { // Moyenne des supercosts
      const allRows = db.prepare("SELECT id, group_id, cout FROM ticket_costs WHERE id_ticket = ? AND type_cout = 'super_cost'").all(ticket_id);
      let totalSum = 0;
      let groups = new Set();
      let nullGroupCount = 0;
      for (const row of allRows) {
        totalSum += row.cout;
        if (row.group_id) {
          groups.add(row.group_id);
        } else {
          nullGroupCount++;
        }
      }
      const count = groups.size + nullGroupCount;
      base_cost = count > 0 ? totalSum / count : 0;
    } else if (modeInt === 4) { // Somme des supercosts
      const sumRow = db.prepare("SELECT SUM(cout) as total FROM ticket_costs WHERE id_ticket = ? AND type_cout = 'super_cost'").get(ticket_id);
      base_cost = sumRow ? sumRow.total || 0 : 0;
    } else {
      return res.status(400).json({ error: 'Invalid mode' });
    }
    
    res.status(200).json({ base_cost });
  } catch (error) {
    console.error('Error calculating base cost:', error);
    res.status(500).json({ error: 'Failed to calculate base cost' });
  }
};

exports.saveCustomReopenCost = (req, res) => {
  const { ticket_id, calculated_cost, id_item, id_category, group_id } = req.body;
  try {
    const insertStmt = db.prepare('INSERT INTO ticket_costs (id_ticket, type_cout, cout, id_item, id_category, group_id) VALUES (?, ?, ?, ?, ?, ?)');
    insertStmt.run(ticket_id, 'reopen_cost', calculated_cost, id_item || null, id_category || null, group_id || null);
    res.status(200).json({ reopen_cost: calculated_cost });
  } catch (error) {
    console.error('Error saving custom reopen cost:', error);
    res.status(500).json({ error: 'Failed to save custom reopen cost' });
  }
};
