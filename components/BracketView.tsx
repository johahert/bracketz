import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Match, Player, Round, User } from '@/models/tournament';
import { getByeParticipants, getRounds, getMatches, getRoundsMatchesPlayers } from '@/services/roundsDB';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { MyButton } from './MyButton';
import { IconButton } from './IconButton';
import { updateMatchScore } from '@/services/matchDB';
import { getTournamentParticipants, getUsers, getUsersByStatus } from '@/services/userDB';

interface BracketProps {
    tournamentId: number;
}

export const BracketView = ({ tournamentId }: BracketProps) => {

    const [byeUsers, setByesUsers] = useState<User[]>([])
    const [players, setPlayers] = useState<Player[]>([])
    const [rounds, setRounds] = useState<Round[]>([])
    const [matches, setMatches] = useState<Match[]>([])

    useEffect(() => {
        getBracketData()
    },[tournamentId])
    
    const getBracketData = async () => {
        await getRoundsMatchesPlayers(tournamentId)
        .then((data) => {
            setRounds(data)
            console.log(JSON.stringify(data))
        }).catch((err) => console.log(err))
    }

    const handleStartNextRound = async () => {
        console.log('Starting next round')

        console.log("Tounramend id: "+tournamentId)
        await getTournamentParticipants(tournamentId)
        await getUsers();

        
        const winners = await getUsersByStatus(1, tournamentId)
        console.log('winners', winners)
        return
        const losers = await getUsersByStatus(2, tournamentId)
        const rest = await getUsersByStatus(0, tournamentId)
        console.log('losers', losers)
        console.log('rest', rest)

    }
    //TODO hantera initiering av ny omgång - samla byes och vinnare av matcher till en array, slumpa dem och skapa nya matcher
    //Kolla senaste omgång genom att kolla den högsta omgången som har matches
    //Kolla om alla matcher är klara i den omgången
    //Om alla matcher är klara, skapa en ny omgång i databasen, lägg till matcher i rounds
    //Om inte alla matcher är klara, returnera

    const checkRoundComplete = (round: Round):boolean => {
        if(!round.matches) return false;
        return round.matches.every((match) => (!match.active && match.winner !== undefined))
    }

    //toggla en match som aktiv eller inte aktiv för att redigera 
    const handleSetMatchActive = async (match: Match) => {
        

        setRounds((prev) => {
            if(!prev) return []
            const newRounds = prev.map((round) => {
                if(round.matches){
                    const newMatches = round.matches.map((m) => {
                        if(m.id === match.id){
                            return {
                                ...m, 
                                active: !m.active,
                                winner: m.players[0].score === m.players[1].score ? undefined :
                                m.players.reduce((prev, current) => (prev.score > current.score) ? prev : current)
                            }
                        }
                        return m
                    })
                    
                    const updatedRound = { ...round, matches: newMatches };
                    return {
                        ...updatedRound,
                        canFinish: checkRoundComplete(updatedRound),
                    };
                }
                return round
            })
            return newRounds
        })

        if(match.active){
            await updateMatchScore(match, tournamentId)
        }
    }
    //sätter ny score för en spelare i en match - exempel score -1 eller +1 eller konkret nytt tal
    const handleScoreChange = (matchId: number, playerId: number, newScore: number) => {
        setRounds((prevRounds) => {
            return prevRounds.map(round => ({
                ...round,
                matches: round.matches?.map(match => {
                    if (match.id === matchId) {
                        return {
                            ...match,
                            players: match.players.map(player => {
                                if (player.id === playerId) {
                                    return {
                                        ...player,
                                        score: newScore,
                                    
                                    };
                                }
                                return player;
                            })
                        };
                    }
                    return match;
                })
            }));
        });
    };

    return (
        <View className=''>
        {rounds && rounds.map((round, index) => {
            return (
                <View key={round.id} className='py-4'>
                    <Text className='text-white font-bold text-2xl'>Round {round.number}</Text>
                    {round.matches && round.matches.map((match, index) => {
                        return (
                            <View className='bg-teal-500 rounded-md mb-2 p-2' key={match.id}>
                                <View className='flex-row justify-between pb-2'>
                                    <Text className='text-teal-100 text-lg font-semibold'>Match {index+1}</Text>
                                    <Text className='text-teal-100 text-lg font-semibold'>{match.active ? "active" : "not active"}</Text>
                                </View>
                                {match.players && match.players.map((player) => {
                                    return (
                                        <View className={`bg-teal-600 p-2 mb-2 rounded-sm items-center flex-row justify-between ${
                                            player.id === match.winner?.id ? 'bg-teal-700  border-2 border-green-400' : 'bg-teal-600'
                                        } $`} key={player.id}>
                                            
                                            
                                            <Text className='font-semibold text-teal-200 '>{player.name}</Text>
                                            {match.active && (
                                                <View className='flex-row'>
                                                <IconButton icon="remove" variant='danger' onPress={() => handleScoreChange(match.id!, player.id!, player.score - 1)} />
                                                <IconButton icon="add" variant='danger' onPress={() => handleScoreChange(match.id!, player.id!, player.score + 1)} />

                                                </View>
                                           
                                           
                                        ) }
                                            <Text className='font-semibold  text-lg text-teal-200'>{player.score}</Text>
                                            </View>
                                        
                                    )
                                })}
                                <View className='flex-row justify-end py-1'>
                                    {round.active &&(

                                    <IconButton icon="pencil" variant='success' onPress={() => handleSetMatchActive(match)} />
                                    )}

                                </View>

                            </View>
                        )
                    })}
                    {round.canFinish && round.matches && round.active &&(
                        <MyButton  text='Next Round' onPress={handleStartNextRound}/>
                    )}
                </View>
            )   
        })}
        </View>
    )
}
