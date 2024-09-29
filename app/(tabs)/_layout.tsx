import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Tabs } from  'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { NativeTabBarIcon } from '@/components/navigation/NativeTabBarIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tournament } from '@/models/tournament';
const TabsLayout = () => {
  useSafeAreaInsets();

  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  return (
    <Tabs safeAreaInsets={
      {top : 0,  bottom: 5, }
    } 
    
    screenOptions={
      {
        
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#e5e5e5',
        headerShown: false,
        tabBarStyle:{
          backgroundColor: '#525252',
          borderTopWidth: 0,
        }
      }
    }>
      <Tabs.Screen name="index" options={{title : "Home", 
        tabBarIcon:({color, focused}) => (
          <NativeTabBarIcon name={focused? 'home' : 'home-outline'} color={color}  />
        ),
        
        }} 
        
        />
      <Tabs.Screen name="create" options={{title : "Create", 
        tabBarIcon:({color, focused}) => (
          <NativeTabBarIcon name={focused? 'add-circle' : 'add-circle-outline'} color={color}  />
        ),
        
        }} />
      <Tabs.Screen name="play/index" options={{title : "Play",
        tabBarIcon:({color, focused}) => (
          <NativeTabBarIcon name={focused? 'play' : 'play-outline'} color={color}  />
        ),
        
        }} />
      <Tabs.Screen name="play/[id]" options={{title : "Play", href: null,
        tabBarIcon:({color, focused}) => (
          <NativeTabBarIcon name={focused? 'add' : 'add-outline'} color={color}  />
        ),
        
        }} />
        
        
      
    </Tabs>
  )
}

export default TabsLayout