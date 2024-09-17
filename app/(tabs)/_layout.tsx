import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from  'expo-router';

const TabsLayout = () => {
  return (
    <Tabs screenOptions={
      {
        tabBarActiveTintColor: 'red',
        headerShown: false,
      }
    }>
      <Tabs.Screen name="index" options={{title : "Home"}} />
      <Tabs.Screen name="create" />
      
    </Tabs>
  )
}

export default TabsLayout