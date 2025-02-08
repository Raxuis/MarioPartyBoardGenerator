import React, {useEffect} from 'react';
import {View} from "react-native";
import {globalStyles} from "../../styles/globalStyles";
import Animated, {
    useSharedValue,
    withTiming,
    withSpring,
    withSequence,
    useAnimatedStyle,
} from "react-native-reanimated";
import {useMapStore} from "../../store/store";

const RandomMapContainer = ({infoTranslateX, opacity}) => {
    const {map} = useMapStore();

    const iconWidth = useSharedValue(0);
    const iconHeight = useSharedValue(0);
    const textScale = useSharedValue(0);
    const textOpacity = useSharedValue(0);

    useEffect(() => {
        iconWidth.value = withTiming(180, {duration: 300});
        iconHeight.value = withTiming(180, {duration: 300});

        textScale.value = withSequence(
            withSpring(1.2, {
                mass: 1,
                damping: 2,
                stiffness: 100,
            }),
            withSpring(1, {damping: 4, stiffness: 100})
        );

        textOpacity.value = withTiming(1, {duration: 500});
    }, []);

    const animatedTextStyle = useAnimatedStyle(() => ({
        transform: [{scale: textScale.value}],
        opacity: textOpacity.value,
    }));

    return (
        <View style={[globalStyles.centeredContainer, {
            padding: 20,
        }]}>
            <Animated.Image
                source={map.boardIcon}
                style={{
                    width: iconWidth,
                    height: iconHeight,
                    opacity: opacity,
                    resizeMode: 'contain',
                    transform: [{translateX: infoTranslateX}],
                }}
            />
            <Animated.Text
                style={[
                    {
                        fontFamily: 'ShinGoPro-Bold',
                        fontSize: 24,
                        textAlign: 'center',
                        color: 'white',
                        marginTop: 20,
                    },
                    animatedTextStyle,
                ]}
            >
                {map.name}
            </Animated.Text>
            <Animated.Text
                style={[
                    {
                        fontFamily: 'ShinGoPro',
                        fontSize: 14,
                        textAlign: 'center',
                        paddingTop: 10,
                        opacity: 0.7,
                        color: 'white',
                        maxWidth: 300,
                    },
                    animatedTextStyle,
                ]}
            >
                {map.description}
            </Animated.Text>
        </View>
    );
};

export default RandomMapContainer;