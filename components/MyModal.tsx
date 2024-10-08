import { View, Text, Modal, ScrollView } from "react-native";
import { MyButton } from "./MyButton";
import React, { PropsWithChildren } from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
type Prop = PropsWithChildren<{
  title: string;
  isOpen: boolean;
  closeModal: () => void;
}>;

export default function MyModal({ title, isOpen, closeModal, children }: Prop) {
  return (
    <Modal
      className="flex-1 justify-center items-center"
      animationType="slide"
      transparent={true}
      visible={isOpen}
    >
      <View className=" bg-neutral-100 dark:bg-neutral-900 shadow-black shadow-md my-auto mx-4 rounded-md flex-1 max-h-[75vh]">
        {/* Title */}
        <Text className="text-lg text-neutral-950 dark:text-neutral-50 p-4 font-bold mt-4">{title}</Text>

        {/* ScrollView to take remaining space */}
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="overflow-hidden p-4"
          >
            {children}
          </ScrollView>
        </View>

        {/* Close button at the bottom */}
        <View className="p-4">
          <MyButton
            text="Close Modal"
            onPress={closeModal}
          />
        </View>
      </View>
    </Modal>
  );
}
