export function queryAll(db: import('sql.js').Database, sql: string, params: any[] = []): any[] {
  const stmt = db.prepare(sql)
  if (params.length) stmt.bind(params)
  const rows: any[] = []
  while (stmt.step()) {
    const vals = stmt.get() as any[]
    const cols = stmt.getColumnNames()
    const row: any = {}
    cols.forEach((col: string, i: number) => { row[col] = vals[i] })
    rows.push(row)
  }
  stmt.free()
  return rows
}
