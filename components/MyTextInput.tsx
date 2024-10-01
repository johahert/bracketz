import React from "react";
import { TextInput, View, Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { NeutralColors } from "@/constants/Colors";
interface MyTextInputProps {
    placeholder: string; //Placeholder for input field
    label?: string; //Label for input field
    onChangeText?: (text: string) => void; //Function to handle text change
    value?: string; //Value of input field
    isNumeric?: boolean; //If input field is numeric
    isBigLabel?: boolean; //If label should be big
}

export function MyTextInput({placeholder, label, value, isNumeric, onChangeText, isBigLabel}: MyTextInputProps): React.JSX.Element {
  const color = useThemeColor({ light: NeutralColors[600], dark: NeutralColors[400] }, 'text');

  return (
    <View className="mb-4 w-100">
    {label && (

    isBigLabel ? 
        <Text className='text-neutral-800 dark:text-neutral-200 text-2xl font-bold'>{label}</Text> :
        <Text className='text-neutral-800 text-lg font-semibold'>{label}</Text>
      
    )
  }
      <TextInput 
      inputMode={isNumeric ? 'numeric' : 'text'} maxLength={isNumeric ? 3 : 100}
      className="border-b-2 text-lg border-neutral-500  w-full py-2 text-neutral-700 dark:text-neutral-200"
        placeholder={placeholder}
        placeholderTextColor={color}
        autoComplete="off"
        autoCorrect={false}
        selectionColor={color}
        value={value}
        onChangeText={onChangeText}
      />

    </View>
  );
};