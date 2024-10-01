import styled from "styled-components";
import { Dimensions, ScrollView, View } from "react-native";
import { CarouselPage } from "./CarouselPage";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { User } from "@/models/tournament";
const Backgroundscolors = ['#FF0000', '#00FF00', '#0000FF',];
const {width} = Dimensions.get('window');

export interface CarouselData{
    user: User;
    title: string;
    subtitle: string;
}

type CarouselScreenProps = {
    carouselData: CarouselData[];
}

export const CarouselScreen: React.FunctionComponent<CarouselScreenProps> = ({
    carouselData
}) => {

    const animatedX = useSharedValue(0);
    const activeIndex = useDerivedValue(() => Math.round(animatedX.value / width));
   /*  const activeBackground = useAnimatedStyle(() => ({
        backgroundColor: withTiming( Backgroundscolors[activeIndex.value])
    })); */

    const scrollHandler = useAnimatedScrollHandler(e => {
        animatedX.value = e.contentOffset.x;
    })
    


    return (
        <Wrapper  >
        <Carousel
            horizontal
            pagingEnabled
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            >
            {carouselData.map((item, index) => (
                <CarouselPage 
                carouselData={item}
                key={index}
                index={index}
                activeIndex={activeIndex}
                animatedX={animatedX}
                />
            ))}
        </Carousel>
    </Wrapper>
    )

}

const Wrapper = styled(Animated.View)(() => ({
    flex: 1
}));

const Carousel = styled(Animated.ScrollView)(() => ({
    flex: 1,
    marginBottom: 20,
}));