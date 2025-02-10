import React, {useEffect} from 'react';
import {Image, View} from "react-native";
import {useSharedValue, withTiming} from "react-native-reanimated";
import MarioPartyButton from "../components/ui/MarioPartyButton";
import * as Haptics from "expo-haptics";
import {globalStyles} from "../styles/globalStyles";
import useBackgroundSound from '../hooks/useBackgroundSound';
import RandomMapContainer from "../components/RandomBoard/RandomBoardContainer";
import {useBoardStore} from "../store/boardStore";

const RandomBoard = () => {
    const {resetBoard, board, generateBoard} = useBoardStore();

    const {
        toggleSoundMusic: toggleBoardSound,
        stopSound,
        isLoaded,
        loadSound
    } = useBackgroundSound(
        board.sound,
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
            if (isLoaded && board.sound) {
                await toggleBoardSound();
            }
        }

        init();
    }, [board.sound]);


    return (
        <View style={globalStyles.container}>
            {
                board.boardView ? (
                    <Image
                        source={board.boardView}
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
                                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                await stopSound();
                                resetBoard();
                            }}
                        >
                            Retour
                        </MarioPartyButton>
                        <MarioPartyButton
                            triangle={true}
                            primary={true}
                            type="forward"
                            onPress={async () => {
                                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                opacity.value = withTiming(0, {duration: 200});
                                infoTranslateX.value = withTiming(-100, {duration: 300});

                                await stopSound();

                                setTimeout(async () => {
                                    resetBoard();
                                    generateBoard(board);

                                    infoTranslateX.value = 100;
                                    opacity.value = 0;

                                    infoTranslateX.value = withTiming(0, {duration: 300});
                                    opacity.value = withTiming(1, {duration: 200});

                                    if (board.sound) {
                                        await loadSound();
                                        await toggleBoardSound();
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

export default RandomBoard;
