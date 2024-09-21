import { Dimensions, Text, View, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

type Props = PropsWithChildren<{
  title: string;
}>;

export function MyCollapsible({ title, children }: Props) {
  const [height, setHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  // Apply the animated styles for the collapsible view
  const collapsableStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  // Handle the expand/collapse logic inside the onPress event
  const handlePress = () => {
    setExpanded(!expanded);
    if (expanded) {
      // Collapse
      animatedHeight.value = withTiming(0);
      svRotation.value = withTiming(0);
      
    } else {
      // Expand
      
      svRotation.value = withTiming(-(1/8)*3);
      animatedHeight.value = withSpring(height, { damping: 20, stiffness: 50 });
    }
  };

  const svRotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${svRotation.value * 360}deg` }],
  }));

  return (
    <View className="rounded-lg bg-teal-700 mb-4">
      <TouchableOpacity
        className="flex-row justify-between items-center text-white p-6"
        activeOpacity={0.5}
        onPress={handlePress}  // Handle the press event here
      >
        <Text className="text-white text-lg font-bold">{title}</Text>
        <Animated.View style={animatedStyle}>

          <Ionicons name='add' size={32} color="white" />
        </Animated.View>
      </TouchableOpacity>

      {/* Animated View for the collapsible content */}
      <Animated.View style={[collapsableStyle, { overflow: "hidden" }]}>
        {/* This View will measure the content and set its height using onLayout */}
        <View className="px-4 left-0 right-0" style={{ position: "absolute" }} onLayout={onLayout}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
