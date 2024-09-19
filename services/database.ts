import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('bracketz.db');

export const createTable = async () => {
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
          );
          INSERT INTO users (name) VALUES ('John Doe');
            INSERT INTO users (name) VALUES ('Jane Doe');
            INSERT INTO users (name) VALUES ('Alice Doe');
          `
          );
    console.log('Table created successfully');
  } catch (error) {
    console.log('Error creating table', error);
  }
};

export interface User {
    id: number;
    name: string;
}

export const getUsers = async () => {
    try {

        const result: User[] = await db.getAllAsync('SELECT * FROM users');
        return result || [];
        
    } catch (error) {
        console.log('Error getting users', error);
        return [];
    }
};

export const addUser = async (name: string) => {
    try {
      await db.runAsync('INSERT INTO users (name) VALUES (?)',[name]);
      
    } catch (error) {
      console.log('Error adding user', error);
      
    }
};
export const deleteUser = async (id: number) => {
    try {
      await db.runAsync('DELETE FROM users WHERE (id) = ?',[id]);
      
    } catch (error) {
      console.log('Error adding user', error);
      
    }
};
export const deleteAll = async () => {
    try {
        await db.execAsync('DELETE FROM users');
        console.log('All users deleted');
    } catch (error) {
        console.log('Error deleting users', error);
    }
}