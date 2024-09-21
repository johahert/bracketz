import { View, Text, TouchableHighlight } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { IconProps } from '@expo/vector-icons/build/createIconSet';

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  variant?: 'primary' | 'danger' | 'success';
  classes?: string;
}

export function IconButton({ icon, onPress, variant = 'primary', classes}: IconButtonProps): React.JSX.Element {
  
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return 'bg-teal-500 active:bg-teal-700';
      case 'danger':
        return 'bg-red-500 active:bg-red-700';
      case 'success':
        return 'bg-green-500 active:bg-green-700';
      default:
        return 'bg-blue-500 active:bg-blue-700'; 
    }
  };

  const getTextStyle = () => {
    return 'white'; 
  };

  return (
    <TouchableHighlight 
      className={`flex items-center justify-center w-8 h-8 rounded-full ${getButtonStyle()} ${classes}`} 
      onPress={onPress} 
      underlayColor="transparent"
    >
      <Ionicons size={18} color={getTextStyle()} name={icon} />
    </TouchableHighlight>
  );
}
