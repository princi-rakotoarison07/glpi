const db = require('./db');

const items = [
  { nom: 'Ordinateur portable', description: 'Dell Latitude 5520' },
  { nom: 'Souris', description: 'Logitech MX Master 3' },
  { nom: 'Clavier', description: 'Mécanique Cherry MX' },
  { nom: 'Écran', description: 'Samsung 27 pouces 4K' },
  { nom: 'Imprimante', description: 'HP LaserJet Pro' },
];

const insert = db.prepare('INSERT INTO items (nom, description) VALUES (?, ?)');

const insertMany = db.transaction((items) => {
  for (const item of items) {
    insert.run(item.nom, item.description);
  }
});

insertMany(items);

console.log(`✅ ${items.length} items insérés`);