import { Text, View, Image, TouchableHighlight } from "react-native";
import MyParallaxScrollView from "@/components/MyParallaxView";
import { useEffect, useState } from "react";
import { TournamentListView } from "@/components/crudComponents/TournamentListView";
import { getTournaments } from "@/services/tournamentDB";
import { Tournament } from "@/models/tournament";
import { MyTextInput } from "@/components/MyTextInput";
import { Ionicons } from "@expo/vector-icons";
import { useTournaments } from "@/components/TournamentContextProvider";


export default function Index() {
  const { tournaments } = useTournaments();
  interface Status {
    status: number;
    checked: boolean;
    name: string;
  }

  const [searchText, setSearchText] = useState('');
  const [statusFilters, setStatusFilters] = useState<Status[]>([
    {status: 0, checked: true, name: 'Pending'}, 
    {status: 1, checked: true, name: 'Active'}, 
    {status: 2, checked: false, name: 'Completed'},
  ]);

  const handleFilter = (status: number) => {
    const updatedFilters = statusFilters.map(s => {
      if (s.status === status) {
        return {...s, checked: !s.checked}
      }
      return s;
    });
    setStatusFilters(updatedFilters);
  }

  const filteredList = tournaments
  .filter(t => {
    const text = searchText.toLowerCase().trim();
    if(text.length > 0){
      return t.name.toLowerCase().includes(text);
    }
    return true;
  })
  .filter(t => {
    return statusFilters.find(s => s.status === t.status)?.checked || false;
  })
  
  

  return (


    <MyParallaxScrollView headerBackgroundColor='bg-neutral-800 z-10' icon='home-sharp'>
        <View className='px-4 py-4 '>


        {/*Fixa så handlegetusers uppdaterar gränssnittet korrekt / kallar metoden*/ }
        
          <View className="mb-4">

            <MyTextInput
            placeholder="search tournament"
            label="Find Tournament"
            isBigLabel={true}
            value={searchText}
            onChangeText={setSearchText} >
            </MyTextInput>
            <View className={`flex-row flex-wrap gap-1`}>
              {statusFilters.map((status, index) => (
                <TouchableHighlight 
                key={index}
                className={
                  `flex items-center justify-center rounded-md border-2  ${status.checked ? 'border-teal-500' : ' border-neutral-700'} `
                }
                onPress={() => handleFilter(status.status)}
                underlayColor="transparent"
              >
                <View className='flex-row items-center p-1'>
          
                  <Text className={status.checked ? 'text-teal-500 ' : 'text-neutral-700 '  }>{status.name}</Text>
                  <Ionicons size={16} color={status.checked ? '#14b8a6' : '#404040'} name={status.checked ? 'checkmark' : 'add'} />
                </View>
              </TouchableHighlight>
              ))}
            </View>
          </View>
          <TournamentListView tournamentList={filteredList} />
        
        </View>
    </MyParallaxScrollView>
    
  );
}
