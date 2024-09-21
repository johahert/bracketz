import { db } from './schema';

import { User, Tournament } from '@/models/tournament';





export const insertTournament = async (name: string, format: number) => {
    try {
        await db.runAsync('INSERT INTO tournaments (name, format) VALUES (?, ?)', [name, format]);
    } catch (error) {
        console.log('Error adding tournament', error);
    }
}

export const getTournaments = async () => {
    try {
        const result: Tournament[] = await db.getAllAsync('SELECT * FROM tournaments;');
        return result || [];
        
    } catch (error) {
        console.log('Error getting tournaments', error);
        return [];
    }
}

export const getTournamentUsers = async (tournamentId: number) => {
    try {
        const result: User[] = await db.getAllAsync(
            `SELECT users.* 
            FROM users 
            JOIN tournament_participants 
            ON users.id = tournament_participants.users_id 
            WHERE tournament_participants.tournaments_id = ?;`, [tournamentId]);
        return result || [];
        
    } catch (error) {
        console.log('Error getting users', error);
        return [];
    }
};