import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import TournamentView from './[id]'


const PlayLayout = () => {
  return (
    <Stack screenOptions={
        {
            headerShown: false,
        }
    }>
        <Stack.Screen name='index'  />
        <Stack.Screen name='[id]'  />
    </Stack>
  )
}

export default PlayLayout