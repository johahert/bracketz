import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from  'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { NativeTabBarIcon } from '@/components/navigation/NativeTabBarIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const TabsLayout = () => {
  useSafeAreaInsets();
  return (
    <Tabs safeAreaInsets={
      {top : 0,  bottom: 5, }
    } 
    
    screenOptions={
      {
        
        tabBarActiveTintColor: '#ccfbf1',
        tabBarInactiveTintColor: '#14b8a6',
        headerShown: false,
        tabBarStyle:{
          backgroundColor: '#115e59',
          borderTopWidth: 0,
        }
      }
    }>
      <Tabs.Screen name="index" options={{title : "Home", 
        tabBarIcon:({color, focused}) => (
          <NativeTabBarIcon name={focused? 'home' : 'home-outline'} color={color}  />
        ),
        }} />
      <Tabs.Screen name="create" options={{title : "Create", 
        tabBarIcon:({color, focused}) => (
          <NativeTabBarIcon name={focused? 'add-circle' : 'add-circle-outline'} color={color}  />
        ),
        }} />
      
    </Tabs>
  )
}

export default TabsLayout