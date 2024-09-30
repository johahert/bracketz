import { View, Text, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { NeutralColors } from '@/constants/Colors';

interface IconButtonProps {
  onPress?: () => void;
  checked: boolean;
}

export function CheckButton({  onPress, checked }: IconButtonProps): React.JSX.Element {
  const iconColor = useThemeColor({ light: NeutralColors[800], dark: NeutralColors[200] }, 'text');
  return (
    <TouchableHighlight 
      className={
        `flex items-center justify-center rounded-full border-2  ${checked ? 'border-teal-500' : 'border-2 border-neutral-800 dark:border-neutral-200'} `
      }
      onPress={onPress}
      underlayColor="transparent"
    >
      <View className='flex-row items-center gap-3 py-2 px-4'>

        <Text className={checked ? 'text-teal-500 ' : 'text-neutral-800 dark:text-neutral-200'  }>{checked? 'Added' : 'Add'}</Text>
        <Ionicons size={20} color={checked ? '#14b8a6' : iconColor} name={checked ? 'checkmark' : 'add'} />
      </View>
    </TouchableHighlight>
  );
}
