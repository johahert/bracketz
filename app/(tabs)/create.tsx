import { View, Text, Alert , ScrollView } from 'react-native'
import { MyTextInput } from '@/components/MyTextInput'
import { ContentContainer } from '@/components/ContentContainer'
import { MyButton } from '@/components/MyButton'
import { IconButton } from '@/components/IconButton'
import React from 'react'
import { useEffect, useState } from 'react'
import { getUsers, User, addUser, deleteUser } from '@/services/database'


const CreateTorunament = () => {

    useEffect(() => {
        fetchUsers();
    }, [])
    const fetchUsers = async () => {
        const users = await getUsers();
        setUserList(users || []);
    }
    

    //variabler
    const [username, setUsername] = useState('');
    const [userList, setUserList] = useState<User[]>([]);

    const insertUser = async() => {
        if(username.length < 3) return;
        try{

            await addUser(username);
            setUsername('');
            await fetchUsers();
        }catch(error){
            console.log('Error adding user', error);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteUser(id);
            await fetchUsers();
          
        } catch (error) {
          console.log('Error adding user', error);
          
        }
    };


  return (
    <ScrollView className='flex-1 p-4  bg-teal-600'>

        <ContentContainer classes='bg-teal-700'>
        <Text className='text-2xl font-bold text-white pb-4'>Create New User</Text>
          <MyTextInput placeholder={"Enter your username"} label='Username' value={username} onChangeText={setUsername} />
            <MyButton 
            text='Create User' 
            onPress={() => insertUser()}
             />
        </ContentContainer>

        {userList.length > 0 && (
            <ContentContainer classes='bg-teal-700'>
                {userList.map((user, index) => (
                    <ContentContainer key={index} classes='bg-teal-800'>
                        <View className='flex flex-row justify-between'>

                        <Text key={index} className='text-white text-2xl font-bold'>{user.name}</Text>
                        <View className='flex flex-row gap-x-9'>

                        <IconButton icon={'pencil'} variant='primary' classes='mx-2'/>
                        <IconButton icon={'remove'} variant='danger'onPress={() => Alert.alert('Delete User', `Are you sure you want to delete ${user.name}?`, 
                            [
                                {text: 'Yes', onPress: () => handleDelete(user.id)}, 
                                {text: 'No'}
                                ])} />
                        </View>
                        </View>
                    </ContentContainer>
                ))}
            </ContentContainer>
        )}


    </ScrollView>
  )
}

export default CreateTorunament