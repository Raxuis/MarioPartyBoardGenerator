import React, {useEffect, useState} from 'react';
import {Image, Text, View} from "react-native";
import Animated, {useSharedValue, withTiming} from "react-native-reanimated";
import CustomButton from "../components/CustomButton";
import * as Haptics from "expo-haptics";
import {useStore} from "../store/store";
import {globalStyles} from "../styles/globalStyles";
import {Audio} from "expo-av";
import {fadeInSound} from "../utils";

const RandomMap = () => {
    const {resetMap, map, generateMap} = useStore();


    const [sound, setSound] = useState(null);

    const opacity = useSharedValue(0);
    const iconWidth = useSharedValue(0);
    const iconHeight = useSharedValue(0);
    const infoTranslateX = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, {duration: 200});
        iconWidth.value = withTiming(180, {duration: 300});
        iconHeight.value = withTiming(180, {duration: 300});
    }, []);

    useEffect(() => {
        async function loadSound() {
            if (!map.sound) return;

            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
            }

            const {sound} = await Audio.Sound.createAsync(
                map.sound,
                {shouldPlay: false}
            );
            setSound(sound);
            await fadeInSound(sound);
        }

        loadSound();

        return () => {
            sound?.unloadAsync();
        };
    }, [map]);


    return (
        <View style={globalStyles.container}>
            {
                map.boardView ? (
                    <Image
                        source={map.boardView}
                        style={[globalStyles.fullSize, {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            resizeMode: "cover",
                        }]}
                    />) : (
                    <View style={[globalStyles.fullSize, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "white",
                    }]}/>
                )
            }

            <View
                style={[globalStyles.fullSize, {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                }]}>
                <View>
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
                                transform: [{translateX: infoTranslateX}]
                            }}
                        />
                        <Text style={{
                            fontFamily: "ShinGoPro-Bold",
                            fontSize: 24,
                            textAlign: "center",
                            color: "white",
                            marginTop: 20,
                        }}>
                            {map.name}
                        </Text>
                        <Text style={{
                            fontFamily: "ShinGoPro",
                            fontSize: 14,
                            textAlign: "center",
                            paddingTop: 10,
                            opacity: 0.7,
                            color: "white",
                            maxWidth: 300,
                        }}>
                            {map.description}
                        </Text>
                    </View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 20,
                    }}>
                        <CustomButton
                            primary={false}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                resetMap();
                            }}
                        >
                            Retour
                        </CustomButton>
                        <CustomButton
                            triangle={true}
                            primary={true}
                            type="forward"
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                                opacity.value = withTiming(0, {duration: 200});
                                infoTranslateX.value = withTiming(-100, {duration: 300});

                                setTimeout(async () => {
                                    await sound.stopAsync();
                                    resetMap();
                                    generateMap(map);

                                    infoTranslateX.value = 100;
                                    opacity.value = 0;

                                    infoTranslateX.value = withTiming(0, {duration: 300});
                                    opacity.value = withTiming(1, {duration: 200});
                                }, 300);
                            }}
                        >
                            Relancer
                        </CustomButton>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default RandomMap;
