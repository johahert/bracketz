import { View , Text} from "react-native";
import Animated, { SharedValue, useAnimatedStyle, withDelay, withSpring, withTiming } from "react-native-reanimated";
import styled from "styled-components";

type CarouselTextStyleProps = {
    index: number;
    activeIndex: SharedValue<number>;
    title: string;
    subtitle: string;
    name: string;
}

const CarouselTextStyle = styled(View)(() => ({    
    alignItems: 'center',
}));

export const CarouselText: React.FunctionComponent<CarouselTextStyleProps> = ({
    index,
    activeIndex,
    title,
    subtitle,
    name
}) => {

    const animatedSpringStyle = (delay:number) => useAnimatedStyle(() => ({
        opacity: withDelay(delay, withSpring(activeIndex.value === index ? 1 : 0)),
        transform: [
            {
                scale: withDelay(
                    (delay),
                    withSpring(activeIndex.value === index ? 1 : 0)
                )
            }
        ]
    }))
    const animatedTranslateYStyle = (delay:number) => useAnimatedStyle(() => ({
        opacity: withDelay((delay*1.2), withSpring(activeIndex.value === index ? 1 : 0)),
        transform: [
            {
                translateY: withDelay(
                    (delay),
                    withTiming(activeIndex.value === index ? 0 : 30)
                )
            }
        ]
    }))

    return(
        <Animated.View>

        <Animated.View style={animatedSpringStyle(100)}>
            <Text className="font-black uppercase text-neutral-950 dark:text-neutral-100 text-4xl pt-4  text-center">{name}</Text>
        </Animated.View>
        <Animated.View style={animatedTranslateYStyle(300)}>
            <Text className="font-bold text-neutral-800 dark:text-neutral-100 text-lg text-center">{title}</Text>
        </Animated.View>
        <Animated.View style={animatedTranslateYStyle(400)}>
            <Text className="font-bold italic text-neutral-600 dark:text-neutral-100 text-center">{subtitle}</Text>
        </Animated.View>
        </Animated.View>
    )

}