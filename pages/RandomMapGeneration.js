import React, {useEffect} from 'react';
import LoadingCarousel from "../components/LoadingCarousel";
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import {globalStyles} from "../styles/globalStyles";

const RandomMapGeneration = () => {
    const shuffleTranslateY = useSharedValue(0);

    const shuffleAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{translateY: shuffleTranslateY.value}]
    }));

    useEffect(() => {
        shuffleTranslateY.value = withRepeat(
            withTiming(20, {duration: 300, easing: Easing.linear}),
            -1,
            true
        );

        return () => {
            shuffleTranslateY.value = 0;
        }
    })

    return (
        <Animated.View style={[globalStyles.loadingContainer, shuffleAnimatedStyle]}>
            <LoadingCarousel/>
        </Animated.View>
    );
};

export default RandomMapGeneration;
