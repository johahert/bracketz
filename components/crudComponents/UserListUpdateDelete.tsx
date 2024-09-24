import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import { User } from '@/models/tournament'
import { MyCollapsible } from '../MyCollapsible';
import { ContentContainer } from '../ContentContainer';
import { IconButton } from '../IconButton';
import { deleteUser, getUsers } from '@/services/userDB';

interface ListProps {
    users: User[];
    onDeleteUser? : (id: number) => void;
}


export const UserListUpdateDelete = ({users, onDeleteUser}: ListProps) => {

    
    

  return (
    <>
    {users.length > 0 && (
        <MyCollapsible title='Users'>
            <View className='pt-4'>

            {users.map((user, index) => (
                <ContentContainer key={index} classes='bg-teal-800'>
                    <View className='flex-row justify-between'>
                    
                        <View className=''>
                            <Text className='text-white text-lg font-bold'>{user.name}</Text>
                            <Text className='text-teal-100 text-sm font-bold'>Id: {user.id}</Text>
                        </View>
                        <View className='flex flex-row items-center justify-center'>

                            
                            <IconButton icon={'remove'} variant='danger'onPress={() => Alert.alert('Delete User', `Are you sure you want to delete ${user.name}?`, 
                                [
                                    {text: 'Yes', onPress: () => onDeleteUser && onDeleteUser(user.id)}, 
                                    {text: 'No'}
                                ])} />
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

