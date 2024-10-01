import styled from "styled-components";
import { View } from "react-native";
import React from "react";
import { RingItem } from "./RingItem";
import { Dimensions } from "react-native";
import { SharedValue } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const Wrapper = styled(View)(() => ({
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
}));

type RingsProps = {
    pageIndex: number,
    activeIndex: SharedValue<number>
}


export const Rings: React.FunctionComponent<RingsProps> = ({
    pageIndex,
    activeIndex
}) => {

    return (
        <Wrapper>
            {[...new Array(3)].map((_, index) =>(
                <RingItem key={index} index={index} activeIndex={activeIndex} pageIndex={pageIndex} />
            ))}
        </Wrapper>

    )
}

