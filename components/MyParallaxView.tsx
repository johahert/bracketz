import React, { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
  } from 'react-native-reanimated';

type Props = PropsWithChildren <{
    icon?: keyof typeof Ionicons.glyphMap;
    headerBackgroundColor: string;
}>;


const HEADER_HEIGHT = 150;

export default function MyParallaxScrollView({
    children,  headerBackgroundColor, icon
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
                },
                
            ]
        }
    });

    const iconAnimation = useAnimatedStyle(() =>{
        return{
            transform:[
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [2, 1, 0.1]
                    )

                },
                {
                    translateX: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [HEADER_HEIGHT / 1.5, 30, -HEADER_HEIGHT * .01]
                    )
                },
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 25, 5, HEADER_HEIGHT * .01]
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
            <Animated.View className={`overflow-hidden justify-end items-start h-36 ${headerBackgroundColor}`} style={headerAnimation}>
                <Animated.View style={iconAnimation}>
                {icon && <Ionicons  name={icon} size={48} color='#0d9488' />}
                </Animated.View>
            </Animated.View>
            <View className='flex-1  overflow-hidden' style={{flex: 1}}>
                {children}
            </View>
        </Animated.ScrollView>
        </View>
    );

}