import { View, Text, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface IconButtonProps {
  onPress?: () => void;
  checked: boolean;
}

export function CheckButton({  onPress, checked }: IconButtonProps): React.JSX.Element {
  
  return (
    <TouchableHighlight 
      className={
        `flex items-center justify-center rounded-full bg-white ${checked ? 'bg-teal-400' : 'bg-white'} `
      }
      onPress={onPress}
      underlayColor="transparent"
    >
      <View className='flex-row items-center gap-3 py-2 px-4'>

        <Text className={checked ? 'text-white text-lg' : 'text-teal-800 text-lg'  }>{checked? 'Added' : 'Add'}</Text>
        <Ionicons size={24} color={checked ? 'white' : 'black'} name={checked ? 'checkmark' : 'add'} />
      </View>
    </TouchableHighlight>
  );
}
