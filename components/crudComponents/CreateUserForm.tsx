
import { View, Text,  TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { MyTextInput } from '../MyTextInput'
import { MyButton } from '../MyButton'
import { insertUser } from '@/services/userDB'
import MyModal from '../MyModal'
import { ProfilePicture, profilePictures } from '@/constants/ProfilePictures'
import { useUsers } from '../UserContextProvider'

interface Props {
    onGetUsers:  () => void;
}

export const CreateUserForm = ({onGetUsers}: Props) => {
    const { fetchUsers } = useUsers();
    const [modalOpen, setModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(1);

    const handleInsertUser = async() => {
        if(username.length < 3 || username.length > 20) return;
        if(profilePicture < 1 || profilePicture > 12) return;
        try{
            
            await insertUser(username, profilePicture);
            console.log('i ongetusers!!!')
            setUsername('');
            onGetUsers();
            fetchUsers();
            Alert.alert('User added');
        }catch(error){
            console.log('Error adding user', error);
        }
    }

    const handleProfilePicture = (id:number) => {
        console.log('Change Profile Picture')
    }

    const profilePictureList = [];
    for(let i = 1; i < 13; i++){
        profilePictureList.push(
            <TouchableOpacity key={i} onPress={() => setProfilePicture(i)} className={`justify-center flex-grow items-center ${profilePicture === i ? '' : 'opacity-25'}`}>
                <ProfilePicture id={i} size={78} />
            </TouchableOpacity>
        )
    }

  return (
    <View className='pb-4'>
        <MyTextInput placeholder={"Enter your username"}  value={username} onChangeText={setUsername} />

        <View className='flex-row mb-4 items-center justify-between'>

        <ProfilePicture id={profilePicture} size={52}  />
        <View className='flex-1 ml-4'>

        <MyButton 
        text='Change Profile Picture' 
        onPress={() => setModalOpen(true)}
        />
        </View>
        </View>
        <MyButton 
        text='Create User' 
        onPress={handleInsertUser}
        />
        <MyModal title='Profile Picture' isOpen={modalOpen} closeModal={() => setModalOpen(false)} > 
            <View className='flex-row flex-wrap gap-2'>

                {profilePictureList}
            </View>
        </MyModal>
    </View>
  )
}

