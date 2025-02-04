import React, {useEffect} from 'react';
import {Image, Text, View} from "react-native";
import Animated, {useSharedValue, withTiming} from "react-native-reanimated";
import CustomButton from "../components/CustomButton";
import * as Haptics from "expo-haptics";
import {ArrowBigLeft} from "lucide-react-native";
import {useStore} from "../store/store";
import {globalStyles} from "../styles/globalStyles";

const RandomMap = () => {
    const {resetMap, map, generateMap} = useStore();

    const opacity = useSharedValue(0);
    const iconWidth = useSharedValue(0);
    const iconHeight = useSharedValue(0);
    const infoTranslateX = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, {duration: 200});
        iconWidth.value = withTiming(180, {duration: 300});
        iconHeight.value = withTiming(180, {duration: 300});
    }, []);

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
                <View
                    style={[globalStyles.centeredContainer, {
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
                        fontSize: 12,
                        textAlign: "center",
                        paddingTop: 10,
                        opacity: 0.7,
                        color: "white"
                    }}>
                        {map.description}
                    </Text>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <CustomButton
                            style={[globalStyles.CTAButton, {
                                padding: 2,
                                width: 50,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }]}
                            textStyle={{
                                fontSize: 12,
                                fontFamily: "ShinGoPro-Bold",
                            }}
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                resetMap();
                            }}
                        >
                            <ArrowBigLeft color="white" size={26}/>
                        </CustomButton>
                        <CustomButton
                            style={[globalStyles.CTAButton, {flex: 1}]}
                            textStyle={globalStyles.CTAButtonText}
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                                opacity.value = withTiming(0, {duration: 200});
                                infoTranslateX.value = withTiming(-100, {duration: 300});

                                setTimeout(() => {
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
