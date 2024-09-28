import { db } from './schema';

import { User, Round, Match, Player, TournamentFormat, Tournament, TournamentStatus } from '@/models/tournament';
import { updateUserStatus } from './userDB';

export const updateMatchScore = async (match: Match, tournamentId: number) => {
    if(!match.id || match.players.length !== 2) return;
    if(match.players[0].score === match.players[1].score) return; 


    console.log('updating match score');
    for(const player of match.players){
        console.log(player, match.id);
        await updatePlayerScore(player, match.id);
    }
    //get player with highest score
    const winner = match.players.reduce((prev, current) => (prev.score > current.score) ? prev : current);
    const loser = match.players.reduce((prev, current) => (prev.score < current.score) ? prev : current);

    //sätt status 1-2 på vinnare och förlorare
    await updateUserStatus(winner.id, 1, tournamentId).then(() => console.log('winner updated'));
    await updateUserStatus(loser.id, 2, tournamentId).then(() => console.log('loser updated'));

    
}

const updatePlayerScore = async (player: Player, matchId: number) => {

    await db.runAsync('UPDATE match_participants SET score = ? WHERE matches_id = ? AND users_id = ?', [player.score, matchId, player.id])
    .then(() => console.log('player score updated'))
    .catch((error) => console.error('error updating player score', error));

}

