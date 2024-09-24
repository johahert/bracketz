import { db } from './schema';

import { User, Round, Match, Player, TournamentFormat } from '@/models/tournament';

export const insertRound = async (tournamentsId: number, roundNumber: number) => {
    try {
        const roundId = (await db.runAsync('INSERT INTO rounds (tournaments_id, round_number) VALUES (?, ?)', [tournamentsId,  roundNumber])).lastInsertRowId
        console.log('round created : ' + roundNumber)
        return roundId
    } catch (error) {
        console.error('round failed : ' + roundNumber +' : '+ error)
        return null
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

// Params: Users and tournament id
// Logic: Generate rounds depending on amount of users & randomize matchups 1v1 between users
// Future : team matchups and different round formats
export const generateRounds =  async (users: User[], tournamentId: number) => {
    if (users.length < 4 || users.length > 16) return;

    // Calculate the number of rounds needed
    const roundsNeeded = Math.ceil(Math.log2(users.length));
    
    console.log(users)
    // Randomizes array of users
    for (let i = users.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [users[i], users[j]] = [users[j], users[i]];
    }
    console.log(users)
    
    // Logic for matchups (1v1) - rework overflow of players plays an extra round
    let nextPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(users.length))); //rundar upp till antal 4,8,16 etc
    let byes = nextPowerOfTwo - users.length; //hämtar antal som automatiskt ska gå vidare

    // Assign byes to the first few players, who will automatically advance
    let matchups: Match[] = []
    let advancedPlayers: User[] = [];

    // Give byes to the first few players advance to round 2
    for (let i = 0; i < byes; i++) {
        const user: User = users[i];
        advancedPlayers.push(user);
        console.log(`User ${users[i].name} advances to the next round (bye)`);
        await insertByeParticipant(tournamentId, user )
    }

    for(let roundNumber = 1; roundNumber <= roundsNeeded; roundNumber++){
        
        const roundId = await insertRound(tournamentId, roundNumber)
        
        if(roundNumber === 1 && roundId){

            //rest of players gets sent to round 1
            for (let i = byes; i < users.length; i += 2) {
                    if (i + 1 < users.length) {
                        const p1: Player = { user: users[i], score: 0};
                        const p2: Player = { user: users[i+1], score: 0};
                        const newMatch:Match = {
                            players: [p1, p2],
                            completed: false
                        }
                        matchups.push(newMatch);
        
                        await insertMatch(roundId, newMatch);
                }
            }
        }
    }
};

// Insert match - return id and insert player1, player 2
export const insertMatch = async (roundId: number, match: Match) => {
    try {
        if( match.players.length !== 2 ) return;

        const matchId:number = (await db.runAsync('INSERT INTO matches (round_id, status) VALUES (?, ?)',[roundId, 0])).lastInsertRowId //ska hämta tillbaka id
        
        if(matchId){
            console.log('matchid found ::: '+ matchId)
            await insertMatchParticipant(matchId, match.players[0]) // insert player 1
            await insertMatchParticipant(matchId, match.players[1]) // insert plaeyr 2
        }
        return 0
    } catch (error) {
        console.error(error)
        return null;
    } 
}
//Insert a player
const insertMatchParticipant = async (matchId: number, player: Player) => {
    try {
        const userId = player.user.id;
        db.runAsync('INSERT INTO match_participants (matches_id, users_id) VALUES (?, ?)',[matchId, userId],)
        console.log('user inserted : '+player.user.name)
    } catch (error) {
        console.error('user failed : '+player.user.name)
        console.error(error)
        throw error;
    }
}

// Update status to 1 for participant
const insertByeParticipant = async (tournamentId: number, user: User) => {
    try{
        await db.runAsync('UPDATE tournament_participants SET status = 1 WHERE tournaments_id = (?) AND users_id = (?)',
            [tournamentId, user.id])
        console.log('player byed: '+ user.name)
    }catch(error){
        console.error('error byeing player' + error)
    }
}


//TODO - städa upp och skapa vy för rounds!!!! :D