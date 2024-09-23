import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import { User } from '@/models/tournament'
import { ContentContainer } from '../ContentContainer';

import { deleteUser, getUsers } from '@/services/userDB';
import { CheckButton } from '../CheckButton';

interface ListProps{
    onUpdateCompetitors : (updatedUsers: User[]) => void;
}


export const UserListTournament = ({onUpdateCompetitors}: ListProps) => {

    useEffect(() => {
        handleGetUsers();
    }, [])

    const handleGetUsers = async () => {
        await getUsers().then((users) => setUserList(users || []));

    }
    const [userList, setUserList] = useState<User[]>([]);
    const [addedUsers, setAddedUsers] = useState<User[]>([]);
    const handleAddUser = (id: number) => {
        const user = userList.find((user) => user.id === id);
        if (user) {
            let updateAddedUsers;
            if (addedUsers.some((addedUser) => addedUser.id === id)) {
            updateAddedUsers = addedUsers.filter((addedUser) => addedUser.id !== id);
            } else {
            updateAddedUsers = [...addedUsers, user];
            }

            setAddedUsers(updateAddedUsers);
            onUpdateCompetitors(updateAddedUsers);

        }
        console.log(addedUsers);
    }
    

  return (
    <>
    {userList.length > 0 && (
        
            <View className='pt-4'>

            {userList.map((user, index) => (
                <ContentContainer key={index} classes='bg-teal-600'>
                    <View className='flex-row justify-between'>
                    
                        <View className=''>
                            <Text className='text-white text-lg font-bold'>{user.name}</Text>
                            <Text className='text-teal-100 text-sm font-bold'>Id: {user.id}</Text>
                        </View>
                        <View className='flex flex-row items-center justify-center'>
                            <CheckButton onPress={() => handleAddUser(user.id)}
                            checked={addedUsers.some((addedUser) => addedUser.id === user.id)} />
                            
                        </View>
                    </View>
                </ContentContainer>
            ))}
            </View>
        
    )}
    </>
  )
}

