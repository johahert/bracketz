import React from 'react'
import { Tabs } from  'expo-router';
import { NativeTabBarIcon } from '@/components/navigation/NativeTabBarIcon';
import { useThemeColor } from '@/hooks/useThemeColor';
import { NeutralColors } from '@/constants/Colors';
const TabsLayout = () => {
  
  const bgColor = useThemeColor({ light: NeutralColors[50], dark: NeutralColors[950] }, 'backgroundColor');
  const fgColor = useThemeColor({ light: NeutralColors[950], dark: NeutralColors[50] }, 'tint');
  const fgColorFaded = useThemeColor({ light: NeutralColors[700], dark: NeutralColors[300] }, 'faded');

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
        }} />

      <Tabs.Screen name="create" options={{title : "Create", 
        tabBarIcon:({color, focused}) => (
          <NativeTabBarIcon name={focused? 'add-circle' : 'add-circle-outline'} color={color}  />
        ),
        
        }} />
      <Tabs.Screen name="play" options={{title : "Play",
        tabBarIcon:({color, focused}) => (
          <NativeTabBarIcon name={focused? 'play' : 'play-outline'} color={color}  />
        ),
        
        }} />
      <Tabs.Screen name="users" options={{title : "Users", 
        tabBarIcon:({color, focused}) => (
          <NativeTabBarIcon name={focused? 'person' : 'person-outline'} color={color}  />
        ),
        
        }} />

    </Tabs>
  )
}

export default TabsLayout