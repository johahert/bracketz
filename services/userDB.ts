
/*
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('bracketz.db');


const schemaCreation = ""

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


*/
import * as SQLite from 'expo-sqlite';
import { db } from './schema';
import { User } from '@/models/tournament';


export const getUsers = async () => {
    try {
        const result: User[] = await db.getAllAsync('SELECT * FROM users');
        console.log('Users found', result);
        return result || [];
        
    } catch (error) {
        console.log('Error getting users', error);
        return [];
    }
};

export const insertUser = async (name: string) => {
    try {
      await db.runAsync('INSERT INTO users (name) VALUES (?)',[name])
      
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
//get users found in tournament_participants that matches the status
export const getUsersByStatus = async (status: number, tournamentId: number) => {
     try {
        const result:User[] = await db.getAllAsync(
            `SELECT users.* 
            FROM users 
            JOIN tournament_participants 
            ON users.id = tournament_participants.users_id 
            WHERE tournament_participants.status = ?
            AND tournament_participants.tournaments_id = ?`, [status, tournamentId]);
        console.log('Users found by status', result);
        return result || [];
        
    } catch (error) {
        console.log('Error getting users', error);
        return [];
    }
}

export const updateUserStatus = async (id: number, status: number, tournamentId:number) => {
    try {
        await db.runAsync('UPDATE tournament_participants SET status = (?) WHERE users_id = (?) AND tournaments_id = (?)', [status, id, tournamentId]);
    } catch (error) {
        console.log('Error updating user status', error);
    }
}

//set status to 0 where status = 1
export const ResetWinnerStatus = async (tournamentId:number) => {
    try {
      //update tournament_participants set status = 0 where status = 1 and tournaments_id = (?)
        await db.runAsync('UPDATE users SET status = 0 WHERE status = 1 AND tournaments_id = (?)', [tournamentId]);
        console.log('Status reset');
    } catch (error) {
        console.log('Error setting status', error);
    }
}


export const getTournamentParticipants = async (tournamentId: number) => {
    try {
        const result = await db.getAllAsync(
            `SELECT * 
            FROM tournament_participants 
            WHERE tournaments_id = ?;`, [tournamentId]);
        console.log(result)
        
    } catch (error) {
        console.log('Error getting users', error);
        return [];
    }
}