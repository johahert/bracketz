import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tournament, getTournamentStatus, TournamentStatus } from '@/models/tournament';
import { getTournaments } from '@/services/tournamentDB';
import { Link } from 'expo-router';
import { ContentContainer } from '../ContentContainer';
import { Ionicons } from '@expo/vector-icons';




export const TournamentListView = () => {
    useEffect(() => {
        handleGetTournaments();
        console.log(tournamentList)
    }, [])
    
    const [tournamentList, setTournamentList] = useState<Tournament[]>([]);
    
    const handleGetTournaments = async () => {
        const promise = await getTournaments();
        console.log(promise)
        setTournamentList(promise || []);
    }

   

  return (
    <>
    {tournamentList.length > 0 && (
        
            <View className='pt-4'>

            {tournamentList.map((t, index) => (
                <ContentContainer key={index} classes='bg-teal-800'>
                    <View className='flex-row justify-between'>
                    
                        <View>
                            <View className='border-b border-teal-100 pb-1 mb-1 pr-2'>

                            <Text className='text-white text-lg font-bold'>{t.name}</Text>
                            </View>
                            <Text className='text-teal-100 text-sm font-bold'>ID: {t.id}</Text>
                            <Text className='text-teal-100 text-sm font-bold'>{getTournamentStatus(t.status as TournamentStatus)}</Text>
                            <Text className='text-teal-100 text-sm font-bold'>{t.format === 0 ? 'Knockout' : 'Qualifiers'}</Text>
                            
                        </View>
                        <View className='justify-end'>

                        <Link href={`/(tabs)/play/${t.id}`}>
                        <View className='flex-row items-center px-4 py-2 bg-teal-400 rounded-md'>

                            <Text className='text-white pr-1'>View</Text>
                            <Ionicons name='eye' size={24} color={'#fff'} />
                        </View>
                        </Link>
                        </View>
                    </View>
                </ContentContainer>
            ))}
            </View>
        
    )}
    </>
  )
}

