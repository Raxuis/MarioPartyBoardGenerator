import React, {useEffect} from 'react';
import {Image, Text, View} from "react-native";
import Animated, {useSharedValue, withTiming} from "react-native-reanimated";
import MarioPartyButton from "../components/MarioPartyButton";
import * as Haptics from "expo-haptics";
import {useMapStore} from "../store/store";
import {globalStyles} from "../styles/globalStyles";
import useBackgroundSound from '../hooks/useBackgroundSound';
import RandomMapContainer from "../components/RandomMapContainer";

const RandomMap = () => {
    const {resetMap, map, generateMap} = useMapStore();

    const {
        toggleSoundMusic: toggleMapSound,
        stopSound,
        isLoaded,
        loadSound
    } = useBackgroundSound(
        map.sound,
        true,
        false
    );

    const opacity = useSharedValue(0);
    const infoTranslateX = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, {duration: 200});
    }, []);

    useEffect(() => {
        async function init() {
            await stopSound();
            if (isLoaded && map.sound) {
                await toggleMapSound();
            }
        }

        init();
    }, [map.sound]);


    return (
        <View style={globalStyles.container}>
            {
                map.boardView ? (
                    <Image
                        source={map.boardView}
                        style={[globalStyles.fullSize, globalStyles.Inset0Element, {
                            resizeMode: "cover",
                        }]}
                    />) : (
                    <View style={[globalStyles.fullSize, globalStyles.Inset0Element, {
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

                    <RandomMapContainer
                        infoTranslateX={infoTranslateX}
                        opacity={opacity}
                    />

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 20,
                    }}>
                        <MarioPartyButton
                            primary={false}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={async () => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                await stopSound();
                                resetMap();
                            }}
                        >
                            Retour
                        </MarioPartyButton>
                        <MarioPartyButton
                            triangle={true}
                            primary={true}
                            type="forward"
                            onPress={async () => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                opacity.value = withTiming(0, {duration: 200});
                                infoTranslateX.value = withTiming(-100, {duration: 300});

                                await stopSound();

                                setTimeout(async () => {
                                    resetMap();
                                    generateMap(map);

                                    infoTranslateX.value = 100;
                                    opacity.value = 0;

                                    infoTranslateX.value = withTiming(0, {duration: 300});
                                    opacity.value = withTiming(1, {duration: 200});

                                    if (map.sound) {
                                        await loadSound();
                                        await toggleMapSound();
                                    }
                                }, 300);
                            }}

                        >
                            Relancer
                        </MarioPartyButton>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default RandomMap;
