import { View, Text, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { useEffect } from 'react';
import { getTournament } from '@/services/tournamentDB';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
export default function TournamentView () {

    const { id } = useLocalSearchParams();
    useEffect(() => {
      if(id === undefined) return;
      const num = parseInt(id as string);
      getTournamentFromDB(num);

    }, [])
    const getTournamentFromDB = async (id: number) => {
        const tournament = await getTournament(id);
        console.log(tournament);
    }


  return (
    <ScrollView className='py-8 px-4'>

      <Text></Text>
    </ScrollView>
    
  )
}

