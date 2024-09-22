import { View, Text, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { getTournamentAllInfo } from '@/services/tournamentDB';
import { Tournament, TournamentStatus, getTournamentFormat, getTournamentStatus } from '@/models/tournament';



export default function TournamentView () {

    const [tournament, setTournament] = useState<Tournament | null>(null);
    const { id } = useLocalSearchParams();
    useEffect(() => {
      if(id === undefined) return;
      const num = parseInt(id as string);
      getTournamentFromDB(num);

    }, [])
    const getTournamentFromDB = async (id: number) => {
        const initialTournament = await getTournamentAllInfo(id);
        setTournament(initialTournament);
        
    }


  return (
    <ScrollView className='py-8 px-4 bg-teal-400'>
      {tournament ? (
        <View>
          <Text>{tournament.name}</Text>
          <Text>{tournament.id}</Text>
          <Text>{getTournamentFormat(tournament.format)}</Text>
          

          <Text
              
              className={tournament.status === 0 ? 'bg-yellow-300' : 'text-white'}
              >{getTournamentStatus(tournament.status as TournamentStatus)}</Text>
          


        </View>
      ) : (<>
        <Text>OOPS! Tournament not found...</Text>
      
      
      </>)}
    </ScrollView>
    
  )
}

