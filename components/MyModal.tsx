import { View, Text, Modal, ScrollView } from 'react-native';
import { MyButton } from './MyButton';
import React, { PropsWithChildren } from 'react';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
type Prop = PropsWithChildren<{
    title: string;
    isOpen: boolean;
    closeModal: () => void;
}>;

export default function MyModal  ({title, isOpen, closeModal, children}: Prop) {
    
    
    
    return(
        <Modal
        className="flex-1 justify-center items-center"
        animationType='fade'
        transparent={true}
        visible={isOpen}
>
    

  <View className="p-4 bg-teal-700 my-auto mx-4 rounded-md flex-1 max-h-[75vh]">
    {/* Title */}
    <Text className="text-lg text-white  font-bold my-4">{title}</Text>

    {/* ScrollView to take remaining space */}
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="overflow-hidden">
        {children}
      </ScrollView>
    </View>

    {/* Close button at the bottom */}
    <View className="mt-4">
    <MyButton text="Close Modal" onPress={closeModal} />

    </View>
  </View>
  
</Modal>
   
    )
}