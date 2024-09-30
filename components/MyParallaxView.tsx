import React, { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
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


const HEADER_HEIGHT = 250;

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
                        [2, 1, .5]
                    )

                },
                {
                    translateX: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [HEADER_HEIGHT / 1.5, 30, -HEADER_HEIGHT * .1]
                    )
                },
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 25, 5, HEADER_HEIGHT * -1]
                    )
                }
                
               
                
                
                
            ]
        }
    });

    return(
        <View className='flex-1 bg-neutral-50 dark:bg-neutral-950 ' >
        <View className={`h-16 absolute w-full ${headerBackgroundColor}`} />
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={0} contentContainerStyle={{
    flexGrow: 1, // Ensures the content of the ScrollView grows as needed
  }}> 
            <Animated.View className={`overflow-hidden justify-end items-center h-16 ${headerBackgroundColor}`} style={headerAnimation}>
                
                <Image source={require('../assets/images/bottomwavelightdos.svg')} style={{position:'absolute', bottom: 0, left:0, right:0, top:0}} />
                <Animated.Text className='text-6xl uppercase mt-4 text-center font-black text-red-200 dark:text-neutral-100'>Create</Animated.Text>
                
                {/* <Animated.View style={iconAnimation}>
                {icon && <Ionicons  name={icon} size={48} color='#0d0d0d' />}
                </Animated.View> */}
            </Animated.View>
            <View className='flex-1  overflow-hidden' style={{flex: 1}}>
                {children}
            </View>
        </Animated.ScrollView>
        </View>
    );

}