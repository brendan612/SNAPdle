import { Database } from 'sqlite';

export async function setupSchema(db: Database) {
  // Enable foreign key constraints
  await db.exec('PRAGMA foreign_keys = ON;');

  // Create Cards table
  await db.exec(`
  CREATE TABLE IF NOT EXISTS Cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  );`);
}
