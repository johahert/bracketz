import Animated, { SharedValue } from "react-native-reanimated";
import styled from "styled-components";
import { IndicatorDot } from "./IndicatorDot";

type PageIndicatorProps = {

    activeIndex: SharedValue<number>
    width: number
}

const Wrapper = styled(Animated.View)<{ width: number }>((props)=> ({
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: props.width
}))


export const PageIndicator:React.FunctionComponent<PageIndicatorProps> = ({ activeIndex, width }) => {

    return (
        <Wrapper width={width}>
            {[...new Array(3)].map((_, index) =>(
                <IndicatorDot key={index} index={index} activeIndex={activeIndex} pageIndex={index} />
            ))}
        </Wrapper>
    )
}
