import React from "react";
import { View, Dimensions } from "react-native";
import Animated, { interpolate, SharedValue, useAnimatedStyle, withDelay, withSpring } from "react-native-reanimated";
import styled from "styled-components";
import { extraPictures, profilePictures } from "@/constants/ProfilePictures";
import { Image } from "expo-image";
import { Rings } from "./Rings";
import { CarouselText } from "./CarouselText";
import { CarouselData } from "./CarouselScreen";

const { width } = Dimensions.get("window");

type CarouselPageProps= {
    index: number;
    animatedX: SharedValue<number>;
    activeIndex: SharedValue<number>;
    carouselData: CarouselData;
}

export const CarouselPage: React.FunctionComponent<CarouselPageProps> = ({
    index,
    animatedX,
    activeIndex,
    carouselData
}) => {

    const animatedRotationStyle = useAnimatedStyle(() => {
        const degrees = interpolate(
            animatedX.value, 
            [
                width * (index - 1),
                width * index, 
                width * (index + 1),
            ], 
            [
                45,
                0,
                -45
            ]
        )
        const translateY = interpolate(
            animatedX.value, 
            [
                width * (index - 1),
                width * index, 
                width * (index + 1),
            ], 
            [
                300,
                0,
                300
            ]
        )
            
            

        const scale = interpolate(
            animatedX.value,
            [
                width * (index - 1), // Before entering
                width * index,       // Fully entered and centered
                width * (index + 1)  // Exiting
            ],
            [
                0.1, // Scale down when entering
                1,   // Full size when centered
                0.1  // Scale down when exiting
            ]
        );

        const opacity = interpolate(
            animatedX.value, 
            [
                width * (index -1), 
                width * index,
                width * (index + 1),
            ], 
            [
                0, 
                1,
                0
            ]  // Adjust values to your desired effect
        );

        return {
            zIndex : 1,
            opacity: opacity,
            transform: [
                {
                    rotateZ: `${degrees}deg`
                },
                {
                    scale: scale,
                },
                {
                    translateY: translateY
                }
            ]
        }
    })
    
    const miscAnimatedStyle = useAnimatedStyle(() => {
        /* const degrees = interpolate(
            animatedX.value, 
            [
                width * (index - 1),
                width * index, 
                width * (index + 1),
            ], 
            [
                0,
                30,
                0
            ]
        ) */
        const opacity = interpolate(
            animatedX.value, 
            [
                width * (index - .1), 
                width * index,
                width * (index + .1),
            ], 
            [
                0, 
                1,
                0
            ]  
        );
        return{
            opacity: opacity,
            
            transform: [
                {
                    rotateZ: withSpring(activeIndex.value === index ? '30deg' : '0deg')
                    
                },
                {
                    scale: withSpring(activeIndex.value === index ? 1 : 0)
                }
            ]
        }
    })

    const StyledMisc = styled(Animated.Image)(() => ({
        width:120/1.5, 
        height:103/1.5, 
        
    }));

    
    
    return(

        <Wrapper>
        <Rings activeIndex={activeIndex} pageIndex={index} />
        <ImageWrapper className="shadow-black shadow-xl relative">
            <Animated.View  style={animatedRotationStyle} className={'relative shadow-black shadow-lg'}>
                <StyledImage source={profilePictures[carouselData.user.profile_picture ? carouselData.user.profile_picture : 1]} />
            </Animated.View>
            <Animated.View style={miscAnimatedStyle} className={'absolute z-10 top-[-40] right-[-30]'}>
                <StyledMisc source={extraPictures[(index+1)]} /> 
            </Animated.View>
        </ImageWrapper>
            <CarouselText index={index}
            name={carouselData.user.name}
            title={carouselData.title}
            subtitle={carouselData.subtitle}
            activeIndex={activeIndex}
            />
    </Wrapper>    
    )
}

const Wrapper = styled(View)(() => ({
    flex: 1,
    justifyContent: 'center',
    width: width,
}));

const ImageWrapper = styled(View)(() => ({
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    width: 200,
    marginHorizontal: 'auto',
}));

const StyledImage = styled(Animated.Image)(() => ({
    width: 200,
    height: 200,
    borderRadius: 200/8,
    zIndex: 1,
}));
