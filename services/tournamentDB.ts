import { db } from './schema';

import { User, Tournament, Round } from '@/models/tournament';

export const insertTournament = async (name: string) => {
    try {
        await db.runAsync('INSERT INTO tournaments (name) VALUES (?)', [name]);
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

//Bra när bara namn eller status behövs
export const getTournament = async (id: number) => {
    try {
      const result = await db.getFirstAsync('SELECT * FROM tournaments WHERE (id) = (?)' [id]);
      return result;
    } catch (error) {
      console.log('Error getting tournament', error);
      return null; // Return null in case of an error
    }
  }


//More complex query, fetches all the closest relevant information and creates the tournament object
//Returns : Tournament interface object or null
export const getTournamentAllInfo = async (id: number): Promise<Tournament | null> => {

    const query = `
    SELECT 
        t.id AS tournament_id,
        t.name AS tournament_name,
        t.format AS tournament_format,
        t.status AS tournament_status,
        
        u.id AS user_id,
        u.name AS user_name,
        
        r.id AS round_id,
        r.round_number AS round_number

    FROM tournaments t
    LEFT JOIN tournament_participants tp ON t.id = tp.tournaments_id
    LEFT JOIN users u ON tp.users_id = u.id
    LEFT JOIN rounds r ON t.id = r.tournaments_id
    WHERE t.id = ?;
  `;

    try {
        const result = await db.getAllAsync(query, [id]);
        const processedResult = produceTournament(result);


      return processedResult;
    } catch (error) {
      console.log('Error getting tournament', error);
      return null; // Return null in case of an error
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
//Produce a nullable tournament object from query result
const produceTournament = (result: any[]):Tournament |null => {

    if(result.length  === 0) return null;

    const tournament: Tournament = {
        id: result[0].tournament_id,
        name: result[0].tournament_name,
        format: result[0].tournament_format,
        status: result[0].tournament_status,
        competitors: [],
        rounds: []
    };

    //initialize type safe arrays for competitors and rounds
    const competitors: User[] = [];
    const rounds: Round[] = [];

    result.forEach(row => {
        //Checking if user exists in competitor lists, if not adds it
        if(row.user_id && !competitors.some(c => c.id === row.user_id))
            competitors.push({ id: row.user_id, name: row.user_name })

        //add rounds if not already added
        if(row.round_id && !rounds.some(r => r.id === row.round_id))
            rounds.push({ id: row.round_id, number: row.round_number, finished: false })

    }) 

    tournament.competitors = competitors;
    tournament.rounds = rounds;

    return tournament;
}

export const updateTournamentStatus = async (status: number, id: number) => {
    try {
        const query = 
        `UPDATE tournaments
        SET (status) = (?)
        WHERE (id) = (?)`
        await db.runAsync(query,[status, id])
    } catch (error) {
        throw error
    }
    
}