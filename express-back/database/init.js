const db = require('./db');

// Drop tables
db.exec(`DROP TABLE IF EXISTS settings_langue;`);
db.exec(`DROP TABLE IF EXISTS langue;`);
db.exec(`DROP TABLE IF EXISTS settings;`);
db.exec(`DROP TABLE IF EXISTS super_cost;`);
db.exec(`DROP TABLE IF EXISTS ticket_reopen_cost;`);

// Create settings table
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )
`);

// Create langue table
db.exec(`
  CREATE TABLE IF NOT EXISTS langue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL UNIQUE
  )
`);

// Create settings_langue table
db.exec(`
  CREATE TABLE IF NOT EXISTS settings_langue (
    id_ordre INTEGER NOT NULL,
    id_langue INTEGER NOT NULL,
    valeur TEXT NOT NULL,
    PRIMARY KEY (id_ordre, id_langue),
    FOREIGN KEY (id_langue) REFERENCES langue(id) ON DELETE CASCADE
  )
`);

// Create ticket_super_cost table
db.exec(`
  CREATE TABLE IF NOT EXISTS super_cost (
    ticket_id INTEGER PRIMARY KEY,
    super_cost REAL NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS ticket_reopen_cost (
    ticket_id INTEGER PRIMARY KEY,
    reopen_cost REAL NOT NULL
  )
`);


// Seed default settings
const defaultSettings = [
  { key: 'color_nouveau', value: '#3b82f6' },
  { key: 'color_inProgress', value: '#f59e0b' },
  { key: 'color_termine', value: '#10b981' },
  { key: 'selected_language_id', value: '1' }
];

const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
const insertSettingTransaction = db.transaction((settings) => {
  for (const s of settings) {
    insertSetting.run(s.key, s.value);
  }
});
insertSettingTransaction(defaultSettings);

// Seed default languages
const defaultLanguages = [
  { id: 1, nom: 'Français' },
  { id: 2, nom: 'Malgache' }
];

const insertLanguage = db.prepare('INSERT OR IGNORE INTO langue (id, nom) VALUES (?, ?)');
const insertLanguageTransaction = db.transaction((languages) => {
  for (const l of languages) {
    insertLanguage.run(l.id, l.nom);
  }
});
insertLanguageTransaction(defaultLanguages);

// Seed default translations (settings_langue)
const defaultTranslations = [
  // id_ordre, id_langue, valeur
  // Français (id_langue = 1)
  { id_ordre: 1, id_langue: 1, valeur: 'Nouveau' },
  { id_ordre: 2, id_langue: 1, valeur: 'In progress (assigné)' },
  { id_ordre: 3, id_langue: 1, valeur: 'Terminé' },
  // Malgache (id_langue = 2)
  { id_ordre: 1, id_langue: 2, valeur: 'Vaovao' },
  { id_ordre: 2, id_langue: 2, valeur: 'Efa manao' },
  { id_ordre: 3, id_langue: 2, valeur: 'Vita' }
];

const insertTranslation = db.prepare('INSERT OR REPLACE INTO settings_langue (id_ordre, id_langue, valeur) VALUES (?, ?, ?)');
const insertTranslationTransaction = db.transaction((translations) => {
  for (const t of translations) {
    insertTranslation.run(t.id_ordre, t.id_langue, t.valeur);
  }
});
insertTranslationTransaction(defaultTranslations);

console.log('✅ Database successfully initialized. Tables settings, langue, and settings_langue created and seeded.');