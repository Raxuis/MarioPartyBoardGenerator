import React, {useEffect} from 'react';
import {Dimensions, Platform, StatusBar, TouchableOpacity, StyleSheet} from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {Easing, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import useButtonSound from "../hooks/useButtonSound";

const Star = () => {

    const {
        playSound
    } = useButtonSound(
        require('../assets/sounds/easter-egg.mp3')
    );

    const windowWidth = Dimensions.get('window').width;

    const starTranslateX = useSharedValue(0);
    const starTranslateY = useSharedValue(0);
    const starScale = useSharedValue(1);

    useEffect(() => {

        starTranslateX.value = withRepeat(
            withTiming(windowWidth - 70, {
                duration: 3000,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            -1,
            true
        );

        starTranslateY.value = withRepeat(
            withTiming(100, {
                duration: 2000,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            -1,
            true
        );

        starScale.value = withRepeat(
            withTiming(1.2, {
                duration: 1000,
                easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            -1,
            true
        );

        return () => {
            starTranslateX.value = 0;
            starTranslateY.value = 0;
            starScale.value = 1;
        }
    });

    const handlePress = async () => {
        await playSound();
    }

    return (
        <Animated.View
            style={[styles.star, {
                top: Platform.OS === 'ios'
                    ? 50
                    : StatusBar.currentHeight + 10,
                left: 10,
                marginTop: 10,
                transform: [
                    {translateX: starTranslateX},
                    {translateY: starTranslateY},
                    {scale: starScale}
                ],
            }]}
        >
            <TouchableOpacity onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                handlePress();
            }}>
                <Animated.Image
                    source={require('../assets/star.png')}
                    style={{
                        width: 60,
                        height: 60,
                    }}
                />
            </TouchableOpacity>
        </Animated.View>
    );
};

export default Star;


const styles = StyleSheet.create({
    star: {
        position: 'absolute',
        width: 60,
        height: 60,
    },
})