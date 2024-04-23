import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { setupSchema } from './schema';
import path from 'path';

export async function initializeDatabase() {
  const dbPath = path.join(__dirname, 'database.db');

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await setupSchema(db);
  return db;
}
