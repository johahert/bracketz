import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Tabs } from  'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { NativeTabBarIcon } from '@/components/navigation/NativeTabBarIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tournament } from '@/models/tournament';
import { useThemeColor } from '@/hooks/useThemeColor';
const TabsLayout = () => {
  useSafeAreaInsets();

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const bgColor = useThemeColor({ light: '#fff', dark: '#0a0a0a' }, 'backgroundColor');
  const fgColor = useThemeColor({ light: '#0a0a0a', dark: '#fafafa' }, 'tint');
  const fgColorFaded = useThemeColor({ light: '#262626', dark: '#e5e5e5' }, 'faded');

  return (
    <Tabs safeAreaInsets={
      {top : 0,  bottom: 0, }
    } 
    
    screenOptions={
      {
        
        tabBarActiveTintColor: fgColor,
        tabBarInactiveTintColor: fgColorFaded,
        headerShown: false,
        tabBarStyle:{
          backgroundColor: bgColor,
          borderTopWidth: 1,
          borderTopColor: '#a3a3a3',
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