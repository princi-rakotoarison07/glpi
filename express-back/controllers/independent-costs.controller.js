const db = require('../database/db');

const handle = (res, fn) => {
  try { fn(); }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.createCloseCosts = (req, res) => handle(res, () => {
  const { id_Ticket, superCost = 0, glpiCost = 0, items = [] } = req.body;
  const count = items.length || 1;
  const group = Date.now();
  const insert = db.prepare('INSERT INTO couts_independant (id_Ticket, type_cout, cout, id_item, category, [group]) VALUES (?, ?, ?, ?, ?, ?)');
  
  db.transaction(() => {
    if (items.length === 0) {
      insert.run(id_Ticket, 'Glpi', glpiCost, null, null, group);
      insert.run(id_Ticket, 'cout_saisi', superCost, null, null, group);
    } else {
      items.forEach(item => {
        insert.run(id_Ticket, 'Glpi', glpiCost / count, item.id_item ? String(item.id_item) : null, item.category || null, group);
        insert.run(id_Ticket, 'cout_saisi', superCost / count, item.id_item ? String(item.id_item) : null, item.category || null, group);
      });
    }
  })();
  res.json({ success: true, group });
});

exports.createReopenCost = (req, res) => handle(res, () => {
  const { id_Ticket, coutReouverture = 0 } = req.body;
  const group = Date.now();

  const latest = db.prepare("SELECT [group] FROM couts_independant WHERE id_Ticket = ? AND type_cout = 'cout_saisi' ORDER BY [group] DESC LIMIT 1").get(id_Ticket);
  if (!latest) return res.json({ success: false });

  const rows = db.prepare("SELECT * FROM couts_independant WHERE id_Ticket = ? AND [group] = ? AND type_cout = 'cout_saisi'").all(id_Ticket, latest.group);
  const insert = db.prepare('INSERT INTO couts_independant (id_Ticket, type_cout, cout, id_item, category, [group]) VALUES (?, ?, ?, ?, ?, ?)');

  db.transaction(() => {
    rows.forEach(r => insert.run(id_Ticket, 'Reouverture', r.cout * (coutReouverture / 100), r.id_item, r.category, group));
  })();
  res.json({ success: true, group });
});

exports.deleteLatestCostGroup = (req, res) => handle(res, () => {
  const id = Number(req.params.id);
  const max = db.prepare('SELECT MAX([group]) as maxGroup FROM couts_independant WHERE id_Ticket = ?').get(id);
  if (max?.maxGroup) db.prepare('DELETE FROM couts_independant WHERE id_Ticket = ? AND [group] = ?').run(id, max.maxGroup);
  res.json({ success: true });
});

exports.getIndependentCosts = (req, res) => handle(res, () => {
  const categories = db.prepare(`
    WITH combined AS (
      SELECT c.* FROM couts_independant c
      JOIN (SELECT id_Ticket, MAX([group]) as mg FROM couts_independant WHERE type_cout = 'Glpi' GROUP BY id_Ticket) m
      ON c.id_Ticket = m.id_Ticket AND c.[group] = m.mg AND c.type_cout = 'Glpi'
      UNION ALL
      SELECT * FROM couts_independant WHERE type_cout != 'Glpi'
    )
    SELECT COALESCE(category, 'Aucun') AS category,
           SUM(CASE WHEN type_cout = 'Glpi' THEN cout ELSE 0 END) AS normalCost,
           SUM(CASE WHEN type_cout = 'cout_saisi' THEN cout ELSE 0 END) AS superCost,
           SUM(CASE WHEN type_cout = 'Reouverture' THEN cout ELSE 0 END) AS reopenCost,
           SUM(cout) AS totalCost
    FROM combined GROUP BY category
  `).all();

  const history = db.prepare(`
    SELECT [group] AS groupTimestamp, id_Ticket,
           SUM(CASE WHEN type_cout = 'Glpi' THEN cout ELSE 0 END) AS totalNormalCost,
           SUM(CASE WHEN type_cout = 'cout_saisi' THEN cout ELSE 0 END) AS totalSuperCost,
           SUM(CASE WHEN type_cout = 'Reouverture' THEN cout ELSE 0 END) AS totalReopenCost,
           SUM(cout) AS totalCost,
           SUM(CASE WHEN type_cout = 'Glpi' THEN 1 ELSE 0 END) AS itemCount,
           GROUP_CONCAT(DISTINCT COALESCE(category, 'Aucun') || ' #' || COALESCE(id_item, 'N/A')) AS itemsList
    FROM couts_independant GROUP BY [group], id_Ticket ORDER BY [group] DESC
  `).all();

  res.json({ categories, history });
});
