const db = require('../database/db');

const handle = (res, fn) => {
  try { fn(); }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getSettings = (req, res) => handle(res, () => {
  const settingsObj = {};
  db.prepare('SELECT * FROM settings').all().forEach(row => settingsObj[row.key] = row.value);
  if (!settingsObj.selected_language_id) settingsObj.selected_language_id = '1';

  const languages = db.prepare('SELECT * FROM langue').all();
  settingsObj.languages = languages;

  const allTranslations = {};
  languages.forEach(lang => allTranslations[lang.id] = { label_nouveau: '', label_inProgress: '', label_termine: '' });

  db.prepare('SELECT * FROM settings_langue').all().forEach(row => {
    const langId = row.id_langue;
    if (!allTranslations[langId]) allTranslations[langId] = {};
    if (row.id_ordre === 1) allTranslations[langId].label_nouveau = row.valeur;
    if (row.id_ordre === 2) allTranslations[langId].label_inProgress = row.valeur;
    if (row.id_ordre === 3) allTranslations[langId].label_termine = row.valeur;
  });
  settingsObj.all_translations = allTranslations;

  const activeTrans = allTranslations[settingsObj.selected_language_id] || {};
  settingsObj.label_nouveau = activeTrans.label_nouveau || 'Nouveau';
  settingsObj.label_inProgress = activeTrans.label_inProgress || 'In progress (assigné)';
  settingsObj.label_termine = activeTrans.label_termine || 'Terminé';

  res.json(settingsObj);
});

const updateSettings = (req, res) => handle(res, () => {
  const { all_translations, ...generalSettings } = req.body;
  const updateStmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');

  db.transaction(() => {
    Object.entries(generalSettings).forEach(([key, value]) => updateStmt.run(key, String(value)));
    if (all_translations) {
      const updateTransStmt = db.prepare('INSERT OR REPLACE INTO settings_langue (id_ordre, id_langue, valeur) VALUES (?, ?, ?)');
      Object.entries(all_translations).forEach(([langId, trans]) => {
        const idLangue = parseInt(langId);
        if (trans.label_nouveau !== undefined) updateTransStmt.run(1, idLangue, String(trans.label_nouveau));
        if (trans.label_inProgress !== undefined) updateTransStmt.run(2, idLangue, String(trans.label_inProgress));
        if (trans.label_termine !== undefined) updateTransStmt.run(3, idLangue, String(trans.label_termine));
      });
    }
  })();

  res.json({ message: 'Settings and translations updated successfully' });
});

module.exports = { getSettings, updateSettings };
