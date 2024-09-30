import { View, Text, Alert} from 'react-native'
import { MyTextInput } from '@/components/MyTextInput'
import { ContentContainer } from '@/components/ContentContainer'
import { MyCollapsible } from '@/components/MyCollapsible'
import { MyButton } from '@/components/MyButton'
import { IconButton } from '@/components/IconButton'
import React from 'react'
import MyParallaxScrollView from '@/components/MyParallaxView'
import { useEffect, useState } from 'react'
import { getUsers,  insertUser, deleteUser } from '@/services/userDB'
import { getTournaments, insertTournament } from '@/services/tournamentDB'
import { Tournament, User } from '@/models/tournament'
import { insertRound } from '@/services/roundsDB'
import { CreateUserForm } from '@/components/crudComponents/CreateUserForm'
import { CreateTournamentForm } from '@/components/crudComponents/CreateTournamentForm'
import { UserListUpdateDelete } from '@/components/crudComponents/UserListUpdateDelete'
import { TournamentListView } from '@/components/crudComponents/TournamentListView'

//TODO - Bryt ut userlist till egen komponent (Göra att samma fungerar med tournaments också?)

const CreateTorunament = () => {
    
    //#region users handling

    
    const handleGetUsers = async () => {
        console.log('i handle get users!!!')
        
       
    }
    useEffect(() => {
        handleGetTournaments();
        handleGetUsers();
        
    }, [])

   


    const handleGetTournaments = async () => {
        console.log('i handle get tournaments!!!')

        
    }

  return (
    <MyParallaxScrollView headerBackgroundColor='bg-violet-800' icon='create-sharp'>
        <View className='px-4 bg-neutral-50 dark:bg-neutral-800'>

        <Text className='font-black text-4xl text-neutral-950 dark:text-white  py-6 uppercase'>Create</Text>

        {/*Fixa så handlegetusers uppdaterar gränssnittet korrekt / kallar metoden*/ }
        <MyCollapsible title='Create new user'>
            <CreateUserForm onGetUsers={handleGetUsers} />
        </MyCollapsible>

        <MyCollapsible title='Create Tournament'>
            <CreateTournamentForm onGetTournaments={handleGetTournaments} />
        </MyCollapsible>
        {/*Gör delete user till optional, kan ta bort lokalts ( som en override )*/ }
        
        </View>
    </MyParallaxScrollView>
  )
}

export default CreateTorunament