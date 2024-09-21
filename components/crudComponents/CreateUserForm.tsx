
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { MyTextInput } from '../MyTextInput'
import { MyButton } from '../MyButton'
import { insertUser } from '@/services/userDB'

interface Props {
    handleGetUsers:  () => void;
}

export const CreateUserForm = ({handleGetUsers}: Props) => {
    const [username, setUsername] = useState('');
    const handleInsertUser = async() => {
        if(username.length < 3) return;
        try{
            await insertUser(username);
            setUsername('');
            handleGetUsers;
        }catch(error){
            console.log('Error adding user', error);
        }
    }
  return (
    <View className='pb-4'>
            <MyTextInput placeholder={"Enter your username"} label='Username' value={username} onChangeText={setUsername} />
            <MyButton 
            text='Create User' 
            onPress={handleInsertUser}
            />
    </View>
  )
}

