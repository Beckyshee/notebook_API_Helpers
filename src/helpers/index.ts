import mssql from 'mssql';
import { sqlConfig } from '../config/sqlConfig';

export default class Connection {
    private pool: Promise<mssql.ConnectionPool>;

    constructor() {
        this.pool = this.getConnection();
    }

    async getConnection(): Promise<mssql.ConnectionPool> {
        const pool = mssql.connect(sqlConfig) as Promise<mssql.ConnectionPool>;
        return pool;
    }

    createRequest(request: mssql.Request, data: { [key: string]: string | number }) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                request.input(key, value);
            }
        }
        return request;
    }

    async query(query: string) {
        const results = (await this.pool).request().query(query);
        return (await results).recordset;
    }

    async execute(procedureName: string, data: { id: string, title: string, content: string, createdAt: string }) {
        const pool = await this.pool;
        const request = (await pool.request()) as mssql.Request;
    
      
        request.input('Id', mssql.NVarChar, 100);
        request.input('title', mssql.NVarChar, 200);
        request.input('content', mssql.NVarChar, 800);
        request.input('createdAt', mssql.NVarChar, 150);
    
        request.input('Id', data.id);
        request.input('title', data.title);
        request.input('content', data.content);
        request.input('createdAt', data.createdAt);
    
        const result = await request.execute(procedureName);
        return result.recordset;
    }
    
}
