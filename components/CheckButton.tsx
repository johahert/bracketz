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
        `flex items-center justify-center rounded-full border-2  ${checked ? 'border-teal-500' : 'border-2 border-neutral-700'} `
      }
      onPress={onPress}
      underlayColor="transparent"
    >
      <View className='flex-row items-center gap-3 py-2 px-4'>

        <Text className={checked ? 'text-teal-500 ' : 'text-neutral-700 '  }>{checked? 'Added' : 'Add'}</Text>
        <Ionicons size={20} color={checked ? '#14b8a6' : '#404040'} name={checked ? 'checkmark' : 'add'} />
      </View>
    </TouchableHighlight>
  );
}
