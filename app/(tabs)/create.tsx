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
    const [userList, setUserList] = useState<User[]>([]);
    const handleGetUsers = async () => {
        const users = await getUsers();
        setUserList(users || []);
    }
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
    <MyParallaxScrollView headerBackgroundColor='bg-teal-300' icon='create-sharp'>
        <View className='p-4 bg-teal-600'>

        <Text className='font-black text-4xl text-white p-4 uppercase'>Create</Text>

        <MyCollapsible title='Create new user'>
            <CreateUserForm handleGetUsers={handleGetUsers} />
        </MyCollapsible>

        <MyCollapsible title='Create Tournament'>
            <CreateTournamentForm handleGetUsers={handleGetTournaments} />
        </MyCollapsible>
        
        <UserListUpdateDelete />
        <TournamentListView />


           


        </View>


    </MyParallaxScrollView>
  )
}

export default CreateTorunament