import React from "react";
import { TextInput, View, Text } from "react-native";

interface MyTextInputProps {
    placeholder: string; //Placeholder for input field
    label: string; //Label for input field
    onChangeText?: (text: string) => void; //Function to handle text change
    value?: string; //Value of input field
    isNumeric?: boolean; //If input field is numeric
}

export function MyTextInput({placeholder, label, value, isNumeric, onChangeText}: MyTextInputProps): React.JSX.Element {
  return (
    <View className="mb-4">
    <Text className='text-white text-lg '>{label}</Text>
      <TextInput 
      inputMode={isNumeric ? 'numeric' : 'text'} maxLength={isNumeric ? 3 : 100}
      className="border-b-2 text-lg border-teal-300 w-full py-2 text-white"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />

    </View>
  );
};