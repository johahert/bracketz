import { Text, View, Image } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import MyParallaxScrollView from "@/components/MyParallaxView";
import { useEffect, useState } from "react";
import { MyCollapseBox } from "@/components/MyCollapseBox";
import AnimatedBox from "@/components/AnimatedBox";
import { CollapsableContainer } from "@/components/CollapsibleContainer";
import { MyCollapsible } from "@/components/MyCollapsible";
import { TournamentListView } from "@/components/crudComponents/TournamentListView";
import { CreateUserForm } from "@/components/crudComponents/CreateUserForm";
import CreateTorunament from "../create";
import { CreateTournamentForm } from "@/components/crudComponents/CreateTournamentForm";
import { MyButton } from "@/components/MyButton";
import MyModal from "@/components/MyModal";
import { UserListTournament } from "@/components/crudComponents/UserListTournament";
import { MyTextInput } from "@/components/MyTextInput";
import { UserListUpdateDelete } from "@/components/crudComponents/UserListUpdateDelete";
import { useUsers } from "@/components/UserContextProvider";

export default function UserView() {
  
  const [search, setSearch] = useState('');
  
  const { users } = useUsers();
  const [parentWidth, setParentWidth] = useState(0);
  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  }

  const filteredUsers = users.filter(user => {
    const text = search.toLowerCase().trim();
    if(text === '') return true;
    return user.name.toLowerCase().includes(text);
  });


  return (



    <MyParallaxScrollView headerBackgroundColor='bg-purple-800' icon='person-sharp'>
        <View className='px-4 py-8 bg-neutral-50 dark: dark:bg-neutral-950'>
          <MyTextInput  placeholder="Search users" onChangeText={setSearch} value={search} isBigLabel={true} />
          <UserListUpdateDelete users={filteredUsers} />
        
        </View>
    </MyParallaxScrollView>
    
    
  );
}
