import betterSqlite3 from 'better-sqlite3';

let dbConnection: betterSqlite3.Database | null = null;

export function getDB(): betterSqlite3.Database {
  if (!dbConnection) {
    dbConnection = betterSqlite3(':memory:'); // o './clashdata.db'
    
    initializeTables(dbConnection);
    
    console.log('✅ Conexión a SQLite establecida con better-sqlite3');
  }
  
  return dbConnection;
}

export function initializeTables(db: betterSqlite3.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS api_cache (
      id TEXT PRIMARY KEY,
      endpoint TEXT NOT NULL UNIQUE,
      data TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_cache_endpoint 
    ON api_cache(endpoint);
  `);
}
