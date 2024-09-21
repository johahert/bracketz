import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

type Props = PropsWithChildren<{
    title: string;
}>

export function MyCollapsible({title, children}: Props) {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <View className=' rounded-lg bg-teal-700 mb-4'>
      <TouchableOpacity className='flex-row justify-between items-center  text-white p-4' activeOpacity={.5} onPress={() => setIsOpen(value => !value)}>
        <Text className='text-white text-lg font-bold'>{title}</Text>
        <Ionicons name={isOpen ? 'chevron-down': 'chevron-forward'} size={24} color={'white'}/>
      </TouchableOpacity>
        {isOpen && <View className='px-4'>{children}</View> }
    </View>
  )
}


