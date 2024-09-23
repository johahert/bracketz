import { View, Text, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { getTournamentAllInfo } from '@/services/tournamentDB';
import { Tournament, User, TournamentStatus, getTournamentFormat, getTournamentStatus } from '@/models/tournament';
import { UserListTournament } from '@/components/crudComponents/UserListTournament';
import MyModal from '@/components/MyModal';
import { MyButton } from '@/components/MyButton';



export default function TournamentView () {

    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [modalOpen, setModalOpen] = useState(false)

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
    const handleUpdateCompetitors = (updatedUsers: User[]) => {
        setTournament((prev) => {
          if(!prev) return null;
          return { ...prev, competitors: updatedUsers}
        })
      
    }
    const closeModal = () => setModalOpen(false);

  return (
    <ScrollView className='py-8 px-4 bg-teal-400'>
      {tournament ? (
        <View>
          <View className='flex-row justify-between'>
            <Text className='text-2xl font-bold text-white'>{tournament.name}</Text>
            <View className='bg-yellow-400 py-1 px-2 rounded-lg items-center justify-center' >
            <Text
                className={tournament.status === 0 ? ' ' : 'text-teal-50'}
                >{getTournamentStatus(tournament.status as TournamentStatus)}</Text>
            </View>
          </View>
          <Text className='text-teal-50 text-xs mb-2'>Tournament-ID: {tournament.id}</Text>
          <Text className='text-teal-50 text-lg mb-2'>Type: {getTournamentFormat(tournament.format)}</Text>
          {tournament.competitors && tournament.competitors.length > 0 ? (

            <View className='mb-2'>
              <Text className='text-white mb-2 font-bold text-lg'>Competitors</Text>
              {tournament.competitors.map((c, index) => (
                <View key={index}>
                  <Text className='text-white text-lg'>{c.name}</Text>
                  <Text className='text-teal-100'>{c.id}</Text>
                </View>
              ))}
            </View>
            ) : <Text className='text-white mb-2  text-lg'>No Competitors Yet...</Text>
          }
          <MyButton text='Add Users' onPress={() => setModalOpen(true)} />
          <MyModal isOpen={modalOpen} closeModal={closeModal} title='Users' >
            <UserListTournament onUpdateCompetitors={handleUpdateCompetitors} />

          </MyModal>
          
          


        </View>
      ) : (<>
        <Text>OOPS! Tournament not found...</Text>
      
      
      </>)}
    </ScrollView>
    
  )
}

