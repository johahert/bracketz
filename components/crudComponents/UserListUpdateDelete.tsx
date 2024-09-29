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
            <View className='pt-4'>

            {users.map((user, index) => (
                <ContentContainer key={index} >
                    <View className='flex-row justify-between'>
                    
                        <View className='py-2'>
                            <Text className='text-neutral-950 text-lg font-bold'>{user.name}</Text>
                            <Text className='text-neutral-700 text-xs'>User-ID: {user.id}</Text>
                        </View>
                        <View className='flex flex-row items-center justify-center'>

                            
                           
                        </View>
                    </View>
                </ContentContainer>
            ))}
            </View>
    )}
    </>
  )
}

