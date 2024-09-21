import React, { useRef } from 'react';
import { StyleSheet, View, Button, ViewProps, TouchableWithoutFeedback, Dimensions, Text, TouchableHighlight, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, withDelay, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MyButton } from './MyButton';
import { CreateUserForm } from './crudComponents/CreateUserForm';
import { transform } from '@babel/core';



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
    children?: React.ReactNode;
}                           

export default function AnimatedBox({ parentWidth, children }: AnimatedBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<View | null>(null);
  const width = useSharedValue(100);
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(100);



  const handlePress = () => {
    
    setIsOpen(!isOpen);
    if(isOpen){
        width.value = withSpring(parentWidth, { stiffness: 200, damping: 25 });
        animatedHeight.value = withSpring(height, { stiffness: 200, damping: 25 });
        svRotation.value = withTiming(-(1/8)*3);
        opacity.value = withDelay(200, withTiming(1));
    }
    else{
        svRotation.value = withTiming(0);
        width.value = withSpring(100, { stiffness: 200, damping: 25 });
        animatedHeight.value = withSpring(100, { stiffness: 200, damping: 25 });
        opacity.value = withDelay(200, withTiming(0));
    }
  };



  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const svRotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${svRotation.value * 360}deg` }],
  }));


  const opacity = useSharedValue(0);
  return (
      <MyAnimatedView  className={' bg-teal-400 rounded-xl absolute overflow-hidden'} style={{  width , height: animatedHeight}}>
            
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


            <Animated.View style={{opacity}} className={isOpen ? 'hidden p-4' : ' p-4'} onLayout={onLayout}>
                

                {children}
                
                

                
            
            </Animated.View>
            
    
      </MyAnimatedView>
    
  );
}


