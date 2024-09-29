import { View, Text, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Match, Player, Round, TournamentStatus, User } from '@/models/tournament';
import { getByeParticipants, getRounds, getMatches, getRoundsMatchesPlayers, generateRounds } from '@/services/roundsDB';

import { MyButton } from './MyButton';
import { IconButton } from './IconButton';
import { updateMatchScore } from '@/services/matchDB';
import { useTournaments } from './TournamentContextProvider';

interface BracketProps {
    tournamentId: number;
    tournamentStatusProp: TournamentStatus;
    finishTournament?: () => void;
}

export const BracketView = ({ tournamentId , tournamentStatusProp, finishTournament }: BracketProps) => {
    const { changeTournamentStatus } = useTournaments()

    const [rounds, setRounds] = useState<Round[]>([])
    const [tournamentStatus, setTournamentStatus] = useState<TournamentStatus>(tournamentStatusProp)

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
        
        //check if its the last round
        const lastRound = rounds[rounds.length - 1]
        if(lastRound.number !== 1 && lastRound.matches && lastRound.matches.length === 1){
            console.log('last round')
            //TODO - hantera vinnare av turneringen
            Alert.alert(`Congratulations! ${lastRound.matches[0].winner?.name} has won the tournament!`)
            await changeTournamentStatus(tournamentId, TournamentStatus.COMPLETED)
            setTournamentStatus(TournamentStatus.COMPLETED)
            return
        }

        generateRounds(tournamentId, (rounds.length + 1))
        .then(() => getBracketData()).catch((err) => console.log(err))

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
        if(newScore < 0 || newScore > 30) return;
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

    const getRoundName = (round: Round):string => {
        if(!round.matches) return 'Round not found'
        if(round.number === 1) return 'First Round'
        if(round.matches.length === 1) return 'Final'
        if(round.matches.length === 2) return 'Semi Final'
        if(round.matches.length === 4) return 'Quarter Final'
        if(round.matches.length === 8) return 'Round of 16'
        if(round.matches.length === 16) return 'Round of 32'
        return 'Round not found'
    }

    return (
        <View className='pb-16 pt-8'>
        {rounds && rounds.map((round, index) => {
            return (
                <View key={round.id} className=''>
                    <Text className='text-neutral-900 font-bold  text-2xl'>{getRoundName(round)}</Text>
                    {round.matches && round.matches.map((match, index) => {
                        return (
                            <View className={`py-8 ${
                                (round.matches && round.matches.length-1 === index) ? '' : 'border-b border-neutral-300'
                            }`} key={match.id}>
                                <View className='flex-row justify-between pb-4'>
                                    <Text className='text-neutral-700 text-lg font-semibold'>{getRoundName(round)} Game {index+1}</Text>
                                    <Text className='text-neutral-700 text-lg font-semibold'>{match.active ? "Editing..." : ""}</Text>
                                </View>
                                {match.players && match.players.map((player) => {
                                    return (
                                        <View className={`bg-neutral-200 p-4 mb-2 rounded-md items-center flex-row justify-between ${
                                            player.id === match.winner?.id ? 'bg-neutral-200  border-2 border-green-500' : 'bg-neutral-200'
                                        } $`} key={player.id}>
                                            
                                            
                                            <Text className={` text-neutral-700 ${player.id === match.winner?.id ? 'font-bold' : ''}`}>{player.name}</Text>
                                           
                                            <View className='flex-row items-center gap-4'>

                                            {match.active && (
                                                <View className='flex-row  gap-4'>
                                                <IconButton icon="remove" classes='mr-1' variant='danger' onPress={() => handleScoreChange(match.id!, player.id!, player.score - 1)} />
                                                <IconButton icon="add" variant='primary' onPress={() => handleScoreChange(match.id!, player.id!, player.score + 1)} />

                                                </View>
                                                
                                            ) }
                                            <Text className={`font-semibold text-neutral-700  ${player.id === match.winner?.id ? 'font-black' : ''}`}>{player.score}</Text>
                                            
                                            </View>
                                            
                                            </View>
                                        
                                    )
                                })}
                                <View className='flex-row justify-end py-1'>
                                    {round.active &&(

                                    <IconButton icon="pencil" onPress={() => handleSetMatchActive(match)} />
                                    )}

                                </View>

                            </View>
                        )
                    })}
                    {round.canFinish && round.matches && round.active && tournamentStatus === TournamentStatus.ACTIVE && (
                        <MyButton  
                        text={(round.matches && round.matches.length === 1 && round.number !== 1)
                        ? 'Finish Tournament' : 'Start Next Round'
                        } onPress={handleStartNextRound}/>
                    )}
                </View>
            )   
        })}
        </View>
    )
}
