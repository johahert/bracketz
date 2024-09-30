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
        <View className='flex-1 bg-neutral-50 dark:bg-neutral-950' style={{flex: 1}}>

        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={0} contentContainerStyle={{
    flexGrow: 1, // Ensures the content of the ScrollView grows as needed
  }}> 
            <Animated.View className={`overflow-hidden justify-end items-start h-32 ${headerBackgroundColor}`} style={headerAnimation}>
                <Image source={require('../assets/images/bottomwavelight.svg')} contentFit='cover' style={{flex: 1, left: 0, right: 0, bottom: 0, top: 0, position: 'absolute' }} />
                <Image source={require('../assets/images/topwavelight.svg')} contentFit='cover' style={{flex: 1, left: 0, right: 0, bottom: 0, top: 0, position: 'absolute' }} />
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