import React from "react";
import Animated, { SharedValue, useAnimatedStyle, withDelay, withSpring } from "react-native-reanimated";
import { act } from "react-test-renderer";
import styled from "styled-components";
import { useThemeColor } from "@/hooks/useThemeColor";
import { NeutralColors } from "@/constants/Colors";



type IndicatorDotProps = {
    index: number,
    pageIndex: number,
    activeIndex: SharedValue<number>
};
const Dot = styled(Animated.View)<IndicatorDotProps>(() => ({
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'black'
}))

export const IndicatorDot: React.FunctionComponent<IndicatorDotProps> = ({index, pageIndex, activeIndex}) => {

    const activeColor = useThemeColor({ light: '#0d9488', dark: '#99f6e4' }, 'tint');
    const dotColor = useThemeColor({ light: 'black', dark: 'white' }, 'background');


    const animatedStyle = useAnimatedStyle(() => ({
        width: withSpring(activeIndex.value === pageIndex ? 16 : 10),
        opacity: withSpring(activeIndex.value === pageIndex ? 1 : .7),
        backgroundColor: activeIndex.value === pageIndex ? dotColor : dotColor,
        transform: [
            {
                scale: withSpring(activeIndex.value === pageIndex ? 1 : .9)
            }
        ]
    }));

    return (
        <Dot style={animatedStyle} index={index} pageIndex={pageIndex} activeIndex={activeIndex}  />
    )
}

