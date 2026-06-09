const db = require('./db');

// Drop tables
db.exec(`DROP TABLE IF EXISTS items;`);
db.exec(`DROP TABLE IF EXISTS settings;`);

// Create settings table
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )
`);

const defaultSettings = [
  { key: 'color_nouveau', value: '#3b82f6' },
  { key: 'color_inProgress', value: '#f59e0b' },
  { key: 'color_termine', value: '#10b981' },
  { key: 'label_nouveau', value: 'Nouveau' },
  { key: 'label_inProgress', value: 'In progress (assigné)' },
  { key: 'label_termine', value: 'Terminé' }
];

const insert = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
const insertTransaction = db.transaction((settings) => {
  for (const s of settings) {
    insert.run(s.key, s.value);
  }
});

insertTransaction(defaultSettings);

console.log('✅ Database successfully initialized. Tables items and settings dropped and recreated.');