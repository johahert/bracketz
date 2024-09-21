import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tournament } from '@/models/tournament';
import { getTournaments } from '@/services/tournamentDB';
import { MyCollapsible } from '../MyCollapsible';
import { ContentContainer } from '../ContentContainer';




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
        <MyCollapsible title='Tournaments'>
            <View className='pt-4'>

            {tournamentList.map((t, index) => (
                <ContentContainer key={index} classes='bg-teal-800'>
                    <View className='flex-row justify-between'>
                    
                        <View className=''>
                            <Text className='text-white text-lg font-bold'>{t.name}</Text>
                            <Text className='text-white text-lg font-bold'>ID: {t.id}</Text>
                            
                        </View>
                        
                    </View>
                </ContentContainer>
            ))}
            </View>
        </MyCollapsible>
    )}
    </>
  )
}

