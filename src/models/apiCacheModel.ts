import { getDB } from "../database/getDb.js";
import { Request } from "express";
import { randomUUID } from "crypto";
import { getSQLiteDateTime } from "../utils/getSQLiteDateTime.js";

export class ApiCacheModel {
  static generateCacheKey = (req: Request): string => {
    const method = req.method;
    const path = req.path;
    const query = req.query as Record<string, string>;

    const sortedQuery = Object.keys(query)
      .sort()
      .map(key => `${key}=${query[key]}`)
      .join('&');

    const queryString = sortedQuery ? `?${sortedQuery}` : '';

    return `${method}:${path}${queryString}`;
  }

  static getEndpointCached = async(endpoint: string) => {
    const db = getDB(); 
    
    // Preparar la consulta
    const stmt = db.prepare(`
      SELECT data FROM api_cache
      WHERE expires_at > datetime('now') AND endpoint = ?
    `);
    
    // Ejecutar síncronamente
    const row = stmt.get(endpoint) as { data: string } | undefined;
    
    if (!row?.data) return null;
    return JSON.parse(row.data);
  }

  static setCacheEndpoint = async(
    endpoint: string, 
    data: Record<string,any>,
    options: { ttlMinutes?: number } = {}
  ): Promise<boolean> => {
    const db = getDB();

    try {
      const uuid = randomUUID();
      const dataString = JSON.stringify(data); // data ya es objeto, lo stringificamos
      const expiresAt = new Date(Date.now() + (options.ttlMinutes || 30) * 60 * 1000);
      const expiresAtFormatted = getSQLiteDateTime(expiresAt);

      // Preparar la consulta INSERT
      const stmt = db.prepare(`
        INSERT INTO api_cache (id, endpoint, data, expires_at)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(endpoint) DO UPDATE SET
          data = excluded.data,
          expires_at = excluded.expires_at
      `);

      const result = stmt.run(uuid, endpoint, dataString, expiresAtFormatted);

      return result.changes === 1;

    } catch (error: any) {
      console.log('Error setting cache endpoint:', error);
      throw error; 
    }
  }
}
