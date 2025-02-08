import React, {useEffect} from 'react';
import Animated, {useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import {StyleSheet, View} from "react-native";

const GameLogo = () => {
    const homeIconWidth = useSharedValue(180);
    const homeIconHeight = useSharedValue(180);

    useEffect(() => {
        homeIconHeight.value = withRepeat(withTiming(200, {duration: 1000}), -1, true);
        homeIconWidth.value = withRepeat(withTiming(200, {duration: 1000}), -1, true);

        return () => {
            homeIconWidth.value = 180;
            homeIconHeight.value = 180;
        }
    });

    return (
        <View style={styles.imageContainer}>
            <Animated.Image
                source={require('../assets/game-logo.png')}
                style={{
                    width: homeIconWidth,
                    height: homeIconHeight,
                    resizeMode: 'contain',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        height: 200,
        width: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
})

export default GameLogo;
