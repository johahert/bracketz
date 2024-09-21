import { db } from './schema';

import { User, Round } from '@/models/tournament';

export const insertRound = async (tournamentsId: number, name: string, roundNumber: number) => {
    try {
        await db.runAsync('INSERT INTO rounds (tournaments_id, name, round_number) VALUES (?, ?, ?)', [tournamentsId, name, roundNumber]);
    } catch (error) {
        console.log('Error adding tournament', error);
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