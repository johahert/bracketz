import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import { User } from '@/models/tournament'
import { MyCollapsible } from '../MyCollapsible';
import { ContentContainer } from '../ContentContainer';
import { IconButton } from '../IconButton';
import { deleteUser, getUsers } from '@/services/userDB';
import { ProfilePicture } from '@/constants/ProfilePictures';

interface ListProps {
    users: User[];
    onDeleteUser? : (id: number) => void;
}


export const UserListUpdateDelete = ({users, onDeleteUser}: ListProps) => {

    
    

  return (
    <>
    {users.length > 0 && (
            <View className='py-4'>

            {users.map((user, index) => (
                <ContentContainer key={index} >
                    <View className={`flex-row justify-between items-end pt-4 pb-8 ${
                        index !== (users.length - 1) ? 'border-b border-neutral-200 dark:border-neutral-800' : ''
                    } `}>
                    
                        <View className=''>
                            <Text className='text-neutral-900 dark:text-neutral-100 text-lg font-bold'>{user.name}</Text>
                            <Text className='text-neutral-700 dark:text-neutral-300 text-xs'>User-ID: {user.id}</Text>
                            <Text className='text-neutral-700 m-0 dark:text-neutral-300 text-xs'>Tournaments Won: {user.wins? user.wins : 0}</Text>
                        </View>
                        <View className='flex flex-row items-start justify-end'>
                            <ProfilePicture id={user.profile_picture} />
                            
                           
                        </View>
                    </View>
                </ContentContainer>
            ))}
            </View>
    )}
    </>
  )
}

