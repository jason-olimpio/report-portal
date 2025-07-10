import SQLite from 'react-native-sqlite-storage';
import {type Report} from '@types';

type Transaction = {
  executeSql: (
    sqlStatement: string,
    args?: any[],
    callback?: (tx: Transaction, results: ResultSet) => void,
    errorCallback?: (tx: Transaction, error: any) => boolean | void,
  ) => void;
};

type ResultSet = {
  rows: {
    length: number;
    item: (index: number) => any;
  };
};

type SQLiteDatabase = {
  transaction: (callback: (tx: Transaction) => void) => void;
};

const DB_NAME = 'AppSosReports.db';
const TABLE_NAME = 'pending_reports';

const db: SQLiteDatabase = SQLite.openDatabase({
  name: DB_NAME,
  location: 'default',
});

type PendingReport = {id: number; data: Report};

export const initPendingReportsTable = (): void =>
  db.transaction((tx: Transaction) =>
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT)`,
    ),
  );

export const addPendingReport = async (report: Report): Promise<void> =>
  await new Promise<void>((resolve, reject) =>
    db.transaction((tx: Transaction) =>
      tx.executeSql(
        `INSERT INTO ${TABLE_NAME} (data) VALUES (?)`,
        [JSON.stringify(report)],
        () => resolve(),
        (_: Transaction, error: any) => {
          reject(error);
          return false;
        },
      ),
    ),
  );

export const getAllPendingReports = async (): Promise<PendingReport[]> =>
  new Promise<PendingReport[]>((resolve, reject) =>
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM ${TABLE_NAME}`,
        [],
        (_, results) => {
          const rows = results.rows;
          const reports: PendingReport[] = [];

          for (let i = 0; i < rows.length; i++) {
            reports.push({
              id: rows.item(i).id,
              data: JSON.parse(rows.item(i).data) as Report,
            });
          }
          resolve(reports);
        },
        (_, error) => {
          reject(error);
          return false;
        },
      ),
    ),
  );

export const removePendingReport = async (id: number): Promise<void> =>
  await new Promise<void>((resolve, reject) =>
    db.transaction((tx: Transaction) =>
      tx.executeSql(
        `DELETE FROM ${TABLE_NAME} WHERE id = ?`,
        [id],
        () => resolve(),
        (_: Transaction, error: any) => {
          reject(error);
          return false;
        },
      ),
    ),
  );
