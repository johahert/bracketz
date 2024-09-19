import React, { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
  } from 'react-native-reanimated';

type Props = PropsWithChildren <{
  
  headerImage?: ReactElement;
    headerBackgroundColor: string;
}>;


const HEADER_HEIGHT = 150;

export default function MyParallaxScrollView({
    children, headerImage, headerBackgroundColor
}: Props){

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimation = useAnimatedStyle(() =>{
        return{
            transform:[
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 1.6, 0, HEADER_HEIGHT * 0.75]
                    )
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [2, 1, 1]
                    )
                }
            ]
        }
    });

    return(
        <View className='flex-1 bg-teal-600' style={{flex: 1}}>

        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} contentContainerStyle={{
    flexGrow: 1, // Ensures the content of the ScrollView grows as needed
  }}> 
            <Animated.View className={`overflow-hidden h-36 ${headerBackgroundColor}`} style={headerAnimation}>
                {headerImage}
            </Animated.View>
            <View className='flex-1 rounded-lg overflow-hidden' style={{flex: 1}}>
                {children}
            </View>
        </Animated.ScrollView>
        </View>
    );

}