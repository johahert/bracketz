import { Text, View, Image } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import MyParallaxScrollView from "@/components/MyParallaxView";
import { useEffect, useState } from "react";

NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function Index() {
  const [scooterQuote, setScooterQuote] = useState('');
  useEffect(() => {
    fetch('https://api.kanye.rest')
    .then(response => response.json())
    .then(data => setScooterQuote(data.quote))
  },[])
  return (


    <MyParallaxScrollView 
    headerImage={<Image source={require('@/assets//images/skibidib.png')} style={{width: 250, height: 150}} />}
    headerBackgroundColor={'bg-teal-800' }>

    <View className=" h-full pt-8 bg-teal-600 ">
      <Text className="text-3xl mb-2 uppercase text-white px-8">
        <Text className="font-light">Skibidi</Text>
        <Text className="font-extrabold italic">Brackets</Text>
      </Text>
      <Text className="text-teal-200 max-w-sm px-8 text-md italic font-semibold">
        "{scooterQuote}"
      </Text>
    </View>
    </MyParallaxScrollView>
    
  );
}
