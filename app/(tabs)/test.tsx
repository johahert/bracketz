import { Text, View, Image } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import MyParallaxScrollView from "@/components/MyParallaxView";
import { useEffect, useState } from "react";

import AnimatedBox from "@/components/AnimatedBox";

NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function Test() {

  
  const [parentWidth, setParentWidth] = useState(0);
  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  }
 


  return (


    

    <View className="bg-teal-600">

    <View className="m-4">

    <View className=" h-full overflow-hidden items-end  rounded-xl bg-teal-600 " onLayout={handleLayout}>        
        <Text>ASd</Text>
        <AnimatedBox parentWidth={parentWidth} /> 
        
    </View>
    </View>
    </View>
    
    
  );
}
