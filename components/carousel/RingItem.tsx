import { View } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, withDelay, withSpring } from "react-native-reanimated";
import styled from "styled-components";
styled

const size = 140;

type RingItemProps = {
    index: number,
    pageIndex: number,
    activeIndex: SharedValue<number>
};
const Ring = styled(Animated.View)<RingItemProps>((props) => ({
    opacity: .08 - (props.index * .02),
    position: 'absolute',
    width: size + (props.index * (size / 2)),
    height: size + (props.index * (size / 2)),
    borderRadius: size ,
    
}));
  
export const RingItem:React.FunctionComponent<RingItemProps> = ({index, pageIndex, activeIndex}) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform:[{
            scale: withDelay(100 * index, withSpring(activeIndex.value === pageIndex ? 1 : .5))
        }]
    }));

    return(
        <Ring style={animatedStyle} className="bg-black dark:bg-white" index={index} activeIndex={activeIndex} pageIndex={pageIndex} />
    )
}
