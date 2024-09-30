import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import { User } from '@/models/tournament'
import { ContentContainer } from '../ContentContainer';

import { deleteUser, getUsers } from '@/services/userDB';
import { CheckButton } from '../CheckButton';
import { MyTextInput } from '../MyTextInput';

interface ListProps{
    onUpdateCompetitors : (updatedUsers: User[]) => void;
    selectedCompetitors : User[];
}


export const UserListTournament = ({onUpdateCompetitors, selectedCompetitors}: ListProps) => {

    const [userList, setUserList] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [addedUsers, setAddedUsers] = useState<User[]>([]);
    useEffect(() => {
        handleGetUsers();
    }, [])

    useEffect(() => {
        setAddedUsers(selectedCompetitors); // Sync the addedUsers with the selected competitors
    }, [selectedCompetitors]);

    useEffect(() => {
        setFilteredUsers(userList);
    }, [userList])

    const handleGetUsers = async () => {
        await getUsers().then((users) => setUserList(users || []));
        
    }

    //uppdaterar värde i parent
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
            //skickar list updateAddedUsers upp till parent via funktion som skickas med som parameter
            onUpdateCompetitors(updateAddedUsers);
        }
        console.log(addedUsers);
    }
    const filterUsers = (text: string) => {
        text = text.trim();
        if (text === '') {
            setFilteredUsers(userList);
        } else {
            const filtered = userList.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
            setFilteredUsers(filtered);
        }
    }
  return (
    <>
    {userList  && (
        
            <View className='pt-4'>
            
            <MyTextInput placeholder='Search users'
            onChangeText={(text) => filterUsers(text)}
            
            />

            {filteredUsers.map((user, index) => (
                <ContentContainer key={index} classes={` border-b border-neutral-300 py-4`}>
                    <View className='flex-row justify-between items-end'>
                    
                        <View className=''>
                            <Text className='text-neutral-800 dark:text-neutral-200 text-lg font-bold'>{user.name}</Text>
                            <Text className='text-neutral-500 text-xs font-bold'>Id: {user.id}</Text>
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

