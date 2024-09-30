import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";
import { createSchema, dropSchema } from "@/services/schema";
import { TournamentsProvider } from "@/components/TournamentContextProvider";
import { UsersProvider } from "@/components/UserContextProvider";
import { ParallaxBgClass } from "@/constants/Colors";
NativeWindStyleSheet.setOutput({
  default: "native",
});

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  
  const onMountCreateSchema = async () => {
    try {
      await createSchema();
      Alert.alert('Database setup complete');
    } catch (error) {
      console.log('Error setting up database', error);
      Alert.alert('Error setting up database');
    }
  }

  /*  useEffect(() => {
    onMountCreateSchema();
  }, []); 
   */

  return (
    <TournamentsProvider>
      <UsersProvider>
      <SafeAreaView edges={["top"]} className={`flex-0 ${ParallaxBgClass}`} />
      <SafeAreaView edges={["bottom","left","right"]} className="bg-neutral-50 dark:bg-neutral-950 flex-1">

      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
      </SafeAreaView>
      </UsersProvider>
    </TournamentsProvider>
  );
}
