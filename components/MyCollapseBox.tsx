import { Dimensions, Text, View, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

type Props = PropsWithChildren<{
  title: string;
}>;

export function MyCollapseBox({ title, children }: Props) {
  const [height, setHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useSharedValue(120);
  const animatedWidth = useSharedValue(120);
  

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
      width: animatedWidth.value
    };
  });

  // Handle the expand/collapse logic inside the onPress event
  const handlePress = () => {
    setExpanded(!expanded);
    if (expanded) {
      // Collapse
      animatedHeight.value = withTiming(120);
      animatedWidth.value = withTiming(120);
    } else {
      // Expand
      animatedHeight.value = withSpring(height, { damping: 20, stiffness: 50 });
      animatedWidth.value = withSpring(400, { damping: 20, stiffness: 50 });
    }
  };

  return (

      
    <View className="rounded-lg bg-teal-300 mb-4">
    <Animated.View style={[collapsableStyle, { overflow: "hidden" }]}>
    <TouchableOpacity
      className="flex-row justify-between items-center text-white p-4"
      activeOpacity={0.5}
      onPress={handlePress}  // Handle the press event here
    >
      <Text className="text-white text-lg font-bold">{title}</Text>
      <Ionicons name={expanded ? 'chevron-down' : 'chevron-forward'} size={24} color="white" />
    </TouchableOpacity>

    {/* Animated View for the collapsible content */}
      {/* This View will measure the content and set its height using onLayout */}
      <View className="px-4 left-0 right-0" style={{ position: "absolute" }} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  </View>

  );
}
