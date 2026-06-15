const db = require('./db');

// Drop tables
db.exec(`DROP TABLE IF EXISTS settings_langue;`);
db.exec(`DROP TABLE IF EXISTS langue;`);
db.exec(`DROP TABLE IF EXISTS settings;`);
db.exec(`DROP TABLE IF EXISTS couts;`);
db.exec(`DROP TABLE IF EXISTS couts_independant;`);

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

// Seed default settings
const defaultSettings = [
  { key: 'color_nouveau', value: '#dbeafe' },
  { key: 'color_inProgress', value: '#fef3c7' },
  { key: 'color_termine', value: '#dcfce7' },
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

db.exec(`
  CREATE TABLE IF NOT EXISTS couts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_ticket INTEGER NOT NULL,
    superCost REAL NOT NULL,
    coutReouverture REAL DEFAULT 0
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS couts_independant (
    id_Auto INTEGER PRIMARY KEY AUTOINCREMENT,
    id_Ticket INTEGER NOT NULL,
    type_cout TEXT NOT NULL,
    cout REAL NOT NULL,
    id_item TEXT,
    category TEXT,
    [group] INTEGER NOT NULL
  )
`);

console.log('✅ Database successfully initialized. Tables settings, langue, settings_langue, couts, and couts_independant created and seeded.');