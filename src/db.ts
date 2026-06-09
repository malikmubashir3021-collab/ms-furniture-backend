import initSqlJs, { Database as SqlJsDb } from 'sql.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, '..', 'data.db')

let db: SqlJsDb

export async function getDb() {
  if (db) return db
  const SQL = await initSqlJs()
  if (fs.existsSync(DB_PATH)) {
    const buf = fs.readFileSync(DB_PATH)
    db = new SQL.Database(buf)
  } else {
    db = new SQL.Database()
  }
  db.run('PRAGMA foreign_keys = ON')
  return db
}

export function saveDb() {
  if (!db) return
  fs.writeFileSync(DB_PATH, db.export())
}
