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


NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function Test() {

  
  const [parentWidth, setParentWidth] = useState(0);
  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  }
  
  const handleNum = () => {

    const numvalue = parseInt(num);
    //testRoundsNeeded(numvalue)
  }
 
  const [num , setNum] = useState("");
  return (



    <View className="bg-teal-600">


    <View className=" h-full mb-8 rounded-xl bg-teal-600 " onLayout={handleLayout}>        
      <MyTextInput
      placeholder="Test"
      label="test" onChangeText={setNum} value={num} isNumeric={true} >

      </MyTextInput>
      <MyButton text="asd" onPress={handleNum} /> 
        
    </View>
    </View>
    
    
  );
}
