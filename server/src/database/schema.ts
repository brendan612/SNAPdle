import { Database } from 'sqlite';

export async function setupSchema(db: Database) {
  // Enable foreign key constraints
  await db.exec('PRAGMA foreign_keys = ON;');

  // Create cards table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cost INTEGER NOT NULL,
      power INTEGER NOT NULL,
      ability TEXT,
      ability_type TEXT,
      flavor TEXT,
      image TEXT NOT NULL,
      status TEXT NOT NULL,
      source TEXT NOT NULL,
      sketcher TEXT NOT NULL,
      colorist TEXT NOT NULL,
      inker TEXT NOT NULL,
      created_at DATETIME NOT NULL,
      modified_at DATETIME NOT NULL
    );
  `);

  // Create locations table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ability TEXT NOT NULL,
      image TEXT NOT NULL,
      status TEXT NOT NULL,
      source TEXT NOT NULL,
      rarity TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      created_at DATETIME NOT NULL,
      modified_at DATETIME NOT NULL
    );
  `);

  // Create variants table in SQLite
  await db.exec(`
    CREATE TABLE IF NOT EXISTS variants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      card_id INTEGER NOT NULL,
      image TEXT NOT NULL,
      rarity TEXT NOT NULL,
      "order" INTEGER NOT NULL,
      status TEXT NOT NULL,
      sketcher TEXT NOT NULL,
      colorist TEXT NOT NULL,
      inker TEXT NOT NULL,
      created_at DATETIME NOT NULL,
      modified_at DATETIME NOT NULL,
      FOREIGN KEY(card_id) REFERENCES cards(id)
    );
  `);

  // Create game_records table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS game_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATETIME NOT NULL,
      classic_answer INTEGER NOT NULL,
      classic_completions INTEGER NOT NULL,
      ability_answer INTEGER NOT NULL,
      ability_completions INTEGER NOT NULL,
      location_answer INTEGER NOT NULL,
      location_completions INTEGER NOT NULL,
      art_answer INTEGER NOT NULL,
      art_completions INTEGER NOT NULL,
      art_variant_answer INTEGER NOT NULL,
      art_variant_completions INTEGER NOT NULL,
      emoji_answer INTEGER,
      emoji_completions INTEGER NOT NULL,
      created_at DATETIME NOT NULL,
      modified_at DATETIME NOT NULL,
      FOREIGN KEY(classic_answer) REFERENCES cards(id),
      FOREIGN KEY(location_answer) REFERENCES locations(id),
      FOREIGN KEY(ability_answer) REFERENCES cards(id),
      FOREIGN KEY(emoji_answer) REFERENCES cards(id),
      FOREIGN KEY(art_answer) REFERENCES cards(id),
      FOREIGN KEY(art_variant_answer) REFERENCES variants(id)
    );
  `);

  // Create patch_notes table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patch_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATETIME NOT NULL,
      "update" TEXT NOT NULL,
      created_at DATETIME NOT NULL,
      modified_at DATETIME NOT NULL
    );
  `);
}
