import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

interface MyButtonProps {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'success'; // Optional variant prop with default options
  disabled?: boolean;
}

export function MyButton({ text, onPress, variant = 'primary', disabled }: MyButtonProps): React.JSX.Element {
  // Function to select the styles based on the variant
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return 'bg-neutral-800 dark:bg-neutral-200 active:bg-blue-700';
      case 'danger':
        return 'bg-red-500 active:bg-red-700';
      case 'success':
        return 'bg-green-500 active:bg-green-700';
      default:
        return 'bg-blue-500 active:bg-blue-700'; // Default to primary
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'danger':
        return 'text-white';
      case 'success':
        return 'text-white';
      default:
        return 'text-white dark:text-neutral-900'; // Default to white text
    }
  };

  return (
    <TouchableHighlight disabled={disabled} style={ { opacity : disabled ? .5 : 1 }}
      
      className={`${getButtonStyle()} p-4 rounded-md`} // Apply button styles based on variant
      underlayColor="#ddd"
      onPress={onPress}
    >
      <Text className={`${getTextStyle()} text-sm font-semibold text-center`}>{text}</Text>
    </TouchableHighlight>
  );
}
