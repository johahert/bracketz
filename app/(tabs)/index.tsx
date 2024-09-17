import { Text, View } from "react-native";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function Index() {
  return (
    <View className="flex-1 bg-teal-600 justify-center items-center">
      <Text className="text-2xl text-white">Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
