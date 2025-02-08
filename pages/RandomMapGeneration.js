import React, {useEffect} from 'react';
import LoadingCarousel from "../components/RandomMapGeneration/LoadingCarousel";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import {globalStyles} from "../styles/globalStyles";
import { CAROUSEL_DURATION } from '../constants';

const RandomMapGeneration = () => {
    const shuffleTranslateY = useSharedValue(0);
    const opacity = useSharedValue(1);

    const shuffleAnimatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{translateY: shuffleTranslateY.value}]
    }));

    useEffect(() => {
        shuffleTranslateY.value = withRepeat(
            withTiming(20, {duration: 300, easing: Easing.linear}),
            -1,
            true
        );

        setTimeout(() => {
            opacity.value = withTiming(0, {
                duration: 300,
                easing: Easing.out(Easing.ease)
            });
        }, CAROUSEL_DURATION - 300);

        return () => {
            shuffleTranslateY.value = 0;
            opacity.value = 1;
        }
    }, []);

    return (
        <Animated.View style={[globalStyles.loadingContainer, shuffleAnimatedStyle]}>
            <LoadingCarousel/>
        </Animated.View>
    );
};

export default RandomMapGeneration;
