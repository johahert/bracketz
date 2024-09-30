import { db } from './schema';

import { User, Round, Match, Player, TournamentFormat, Tournament, TournamentStatus } from '@/models/tournament';
import { updateTournamentStatus } from './tournamentDB';
import { insertTournamentUsers } from './tournament_usersDB';
import { getTournamentParticipants, getUsersByStatus, ResetWinnerStatus } from './userDB';

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

export const initializeTournament = async (tournament: Tournament) => {
    //Guards för att att ej initiara turneringen flera gånger eller om spelare saknas
    if(!tournament.competitors) return;
    if(tournament.status !== TournamentStatus.PENDING) {
        console.log('Tournament already started')
        return;
    }

    //Sätter turneringen till aktiv
    await updateTournamentStatus(tournament.id, TournamentStatus.ACTIVE)
    .then(() => console.log('status updated'))
    .catch(() => {
        console.log('status update failed')
        return;
    })
    //lägger till användare i kopplingstabellen
    await insertTournamentUsers(tournament.competitors, tournament.id).then(() => console.log('users updated')).catch(() => {
        console.log('users update failed')
        return;
    })
    //genererar rundor, initiala matcher, byes och spelare
    await generateRounds(tournament.id, 1)

}






// Params: Users and tournament id
// Logic: Generate rounds depending on amount of users & randomize matchups 1v1 between users
// Future : team matchups and different round formats
export const generateRounds =  async (tournamentId: number, roundNumber: number) => {
    

    let users: User[];
    if(roundNumber === 1){
        users = await getTournamentParticipants(tournamentId);
    } else {
        users = await getUsersByStatus(1, tournamentId);
        await ResetWinnerStatus(tournamentId)
    }

    if (users.length < 2 || users.length > 16) return;

    
    console.log(users)
    // Randomizes array of users
    for (let i = users.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [users[i], users[j]] = [users[j], users[i]];
    }
    console.log(users)
    
    //#region only relevant for round 1 with uneven amount of players
    // Logic for matchups (1v1) 
    let nextPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(users.length))); //rundar upp till antal 4,8,16 etc
    let byes = nextPowerOfTwo - users.length; //hämtar antal som automatiskt ska gå vidare

    // Assign byes to the first few players, who will automatically advance
    
    let advancedPlayers: User[] = [];
    // Give byes to the first few players advance to round 2
    for (let i = 0; i < byes; i++) {
        const user: User = users[i];
        advancedPlayers.push(user);
        console.log(`User ${users[i].name} advances to the next round (bye)`);
        await insertByeParticipant(tournamentId, user)
    }
    //#endregion
    
    
    const roundId = await insertRound(tournamentId, roundNumber)
    let matchups: Match[] = []
    
    if(roundId){

        //rest of players gets sent to round 1
        for (let i = byes; i < users.length; i += 2) {
                if (i + 1 < users.length) {
                    const p1: Player = { name: users[i].name, id: users[i].id, score: 0, profile_picture: users[i].profile_picture ? users[i].profile_picture : Math.floor(Math.random() * 12) + 1 };
                    const p2: Player = { name: users[i + 1].name, id: users[i + 1].id, score: 0, profile_picture: users[i + 1].profile_picture ? users[i + 1].profile_picture : Math.floor(Math.random() * 12) + 1 };
                    const newMatch: Match = {
                        players: [p1, p2],
                        active: false
                    }
                    matchups.push(newMatch);
    
                    await insertMatch(roundId, newMatch);
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
        const userId = player.id;
        db.runAsync('INSERT INTO match_participants (matches_id, users_id) VALUES (?, ?)',[matchId, userId],)
        console.log('user inserted : '+player.name)
    } catch (error) {
        console.error('user failed : '+player.name)
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


//#region Getters
export const getByeParticipants = async (tournamentId: number) => {
    try {
        const result: User[] = await db.getAllAsync(
            `SELECT users.* 
            FROM users 
            JOIN tournament_participants 
            ON users.id = tournament_participants.users_id 
            WHERE tournament_participants.tournaments_id = ? AND tournament_participants.status = 1;`, [tournamentId]);
        return result || [];
        
    } catch (error) {
        console.log('Error getting users', error);
        return [];
    }
}

export const getRounds = async (tournamentId: number) => {
    try {
        const result: Round[] = await db.getAllAsync(
            `SELECT 
            id AS id,
            round_number AS number
            FROM rounds 
            WHERE tournaments_id = ?;`, [tournamentId]);
        return result || [];
        
    } catch (error) {
        console.log('Error getting rounds', error);
        return [];
    }
}

export const getMatches = async (roundId: number) => {
    try {
        const result: Match[] = await db.getAllAsync(
            `SELECT * 
            FROM matches 
            WHERE round_id = ?;`, [roundId]);
        return result || [];
        
    } catch (error) {
        console.log('Error getting matches', error);
        return [];
    }
}

const getPlayers = async (matchId: number) => {
    try {
        const result: Player[] = await db.getAllAsync(
            `SELECT users.*, score
            FROM users
            JOIN match_participants
            ON users.id = match_participants.users_id
            WHERE matches_id = ?;`, [matchId]);

        const players: Player[] = result.map(row => ({
            id: row.id,
            name: row.name,
            user: {
                id: row.id,
                name: row.name
            },
            score: row.score
        }));
        
        return result || [];
        
    } catch (error) {
        console.log('Error getting players', error);
        return [];
    }   
}


// Get all rounds with corresponding matches with players
export const getRoundsMatchesPlayers = async (tournamentId: number) => {
    let rounds: Round[] = await getRounds(tournamentId);
    rounds = rounds.sort((a, b) => a.number - b.number);
    

    // Loop over rounds using for...of to handle async/await correctly
    for (const round of rounds) {
        round.matches = await getMatches(round.id !== undefined ? round.id : 0);
        console.log("matches:  "+round.matches)

        // Loop over matches using for...of to handle async/await correctly
        for (const match of round.matches) {
            match.active = false;
            match.players = await getPlayers(match.id !== undefined ? match.id : 0);
            match.winner = match.players[0].score === match.players[1].score ? undefined :
             match.players.reduce((prev, current) => (prev.score > current.score) ? prev : current);
            console.log("players:  "+match.players)
        }
        round.canFinish = round.matches.every((match) => (!match.active && match.winner !== undefined))

       
        round.active = (rounds.length) === round.number ? true : false;
    }
    return rounds;
};
//#endregion