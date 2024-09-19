import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { createTable, deleteAll } from "@/services/database";
import { Alert } from "react-native";
NativeWindStyleSheet.setOutput({
  default: "native",
});

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  /*
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await createTable(); 
        console.log('Database setup complete');
      } catch (error) {
        console.log('Error setting up database', error);
      }
    };
    
    setupDatabase();


  }, []);
  */

  return (
    <SafeAreaView className="bg-teal-800 h-full">

    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    </Stack>
    </SafeAreaView>
  );
}
