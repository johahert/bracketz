import React, { useRef } from 'react';
import { StyleSheet, View, Button, ViewProps, TouchableWithoutFeedback, Dimensions, Text, TouchableHighlight } from 'react-native';
import Animated, { useSharedValue, withDelay, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MyButton } from './MyButton';
import { CreateUserForm } from './crudComponents/CreateUserForm';
import { transform } from '@babel/core';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MyView = React.forwardRef(
  (props: ViewProps, ref: React.LegacyRef<View>) => {
    // some additional logic
    return <View ref={ref} {...props} />;
  }
);

// highlight-next-line
const MyAnimatedView = Animated.createAnimatedComponent(MyView);

interface AnimatedBoxProps {
    parentWidth: number;
}                           

export default function AnimatedBox({ parentWidth }: AnimatedBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<View | null>(null);
  const width = useSharedValue(100);
  const height = useSharedValue(100);



  const handlePress = () => {
    handleContentLayout;
    setIsOpen(!isOpen);
    if(isOpen){
        width.value = withSpring(parentWidth, { stiffness: 200, damping: 25 });
        height.value = withSpring(310, { stiffness: 200, damping: 25 });
        svRotation.value = withTiming(-(1/8)*3);
        opacity.value = withDelay(200, withTiming(1));
    }
    else{
        svRotation.value = withTiming(0);
        width.value = withSpring(100, { stiffness: 200, damping: 25 });
        height.value = withSpring(100, { stiffness: 200, damping: 25 });
        opacity.value = withDelay(200, withTiming(0));
    }
  };

  const [contentHeight, setContentHeight] = useState(0);
  const handleContentLayout = (event:any) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const svRotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${svRotation.value * 360}deg` }],
  }));


  const opacity = useSharedValue(0);
  return (
      <MyAnimatedView  className={' bg-teal-400 rounded-xl absolute overflow-hidden'} style={{  width , height}}>
            
            <TouchableHighlight
                className={`w-[100px] h-[100px] z-10 absolute justify-center items-center top-0 right-0 transition-all duration-500`} // Apply button styles based on variant
                underlayColor="transparent"
                onPress={handlePress}

            >
                <Animated.View
                    style={animatedStyle}
                >

                <Ionicons
                    name={isOpen ? 'add' : 'add'}
                    size={32}
                    color={'white'}
                    />
                </Animated.View>
            </TouchableHighlight>
            <Animated.View style={{opacity}} className={isOpen ? 'hidden p-4' : ' p-4'} onLayout={handleContentLayout}>
            <Text className='text-white font-bold text-2xl mb-4'>Add User</Text>
            <CreateUserForm handleGetUsers={() => {}} />
            </Animated.View>
            
    
      </MyAnimatedView>
    
  );
}


