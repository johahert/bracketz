import { db } from './schema';

import { User, Tournament, Round } from '@/models/tournament';

export const insertTournamentUsers = async (users: User[], tournamentId: number) => {
    try{

        const placeholders = users.map(() => '(?, ?)').join(', ');
        const query:string =  `INSERT INTO tournament_participants (tournaments_id, users_id) VALUES ${placeholders};`;
        const params: (number | string) [] = [];
        users.forEach(u => {
            params.push(tournamentId, u.id);
        })
        await db.runAsync(query,params)
    } catch(err){
        throw err
    }
        
        
}