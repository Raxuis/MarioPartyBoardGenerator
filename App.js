import {Dimensions, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import CustomButton from "./components/CustomButton";
import {useStore} from "./store/store";
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen/build/index";
import Animated, {
    withTiming,
    Easing,
    useSharedValue,
    ReduceMotion,
    withRepeat, useAnimatedStyle,
} from 'react-native-reanimated';
import * as Haptics from "expo-haptics";
import {ArrowBigLeft} from "lucide-react-native";
import MapsDisplay from "./components/MapsDisplay";
import {nintendoColor} from "./constants";
import {Audio} from "expo-av";
import LoadingCarousel from "./components/LoadingCarousel";


export default function App() {

    const {map, generateMap, resetMap, page, setPage} = useStore();
    const [sound, setSound] = useState(null);
    const [randomLoading, setRandomLoading] = useState(false);
    const shuffleTranslateY = useSharedValue(0);
    const shuffleAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{translateY: shuffleTranslateY.value}]
    }));

    const [loaded, error] = useFonts({
        'Super-Mario': require('./assets/fonts/SuperMario256.ttf'),
        'ShinGoPro': require('./assets/fonts/AOTFShinGoProRegular.otf'),
        'ShinGoPro-Bold': require('./assets/fonts/AOTFShinGoProBold.otf'),
        'ShinGoPro-Medium': require('./assets/fonts/AOTFShinGoProMedium.otf'),
        'ShinGoPro-Light': require('./assets/fonts/AOTFShinGoProLight.otf'),
        'ShinGoPro-Extra-Light': require('./assets/fonts/AOTFShinGoProExLight.otf'),
        'ShinGoPro-DeBold': require('./assets/fonts/AOTFShinGoProDeBold.otf'),
        'ShinGoPro-Heavy': require('./assets/fonts/AOTFShinGoProHeavy.otf'),
    });

    const opacity = useSharedValue(0);
    const homeIconWidth = useSharedValue(180);
    const homeIconHeight = useSharedValue(180);
    const iconWidth = useSharedValue(0);
    const iconHeight = useSharedValue(0);
    const infoTranslateX = useSharedValue(0);
    const starTranslateX = useSharedValue(0);
    const starTranslateY = useSharedValue(0);
    const starScale = useSharedValue(1);

    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        async function loadSound() {
            const {sound} = await Audio.Sound.createAsync(
                require('./assets/sounds/random.mp3'),
                {shouldPlay: false, isLooping: true}
            );
            setSound(sound);
        }

        loadSound();
        return () => sound && sound.unloadAsync();
    }, []);

    const toggleMusic = async (play) => {
        if (sound) {
            if (play) {
                await sound.playAsync();
            } else {
                await sound.stopAsync();
            }
        }
    };

    const startShuffleAnimation = () => {
        shuffleTranslateY.value = withRepeat(
            withTiming(20, {duration: 300, easing: Easing.linear}),
            -1,
            true
        );
    };

    const stopShuffleAnimation = () => {
        shuffleTranslateY.value = withTiming(0, {duration: 300});
    };

    const generateRandomMap = async () => {
        await toggleRandomLoading();
        resetHomeAnimations();
    }

    const toggleRandomLoading = () => {
        return new Promise((resolve) => {
            setRandomLoading(true);
            toggleMusic(true);
            startShuffleAnimation();

            setTimeout(() => {
                generateMap(map);
                setRandomLoading(false);
                toggleMusic(false);
                stopShuffleAnimation();
                resolve();
            }, 5000);
        });
    };

    const resetHomeAnimations = () => {
        if (page === "home" && !randomLoading) {
            opacity.value = withTiming(1, {
                duration: 300,
                easing: Easing.elastic(1),
                reduceMotion: ReduceMotion.System,
            });
            console.log(iconWidth);
            console.log(iconHeight);
            iconWidth.value = withTiming(200, {
                duration: 300,
                easing: Easing.elastic(1),
                reduceMotion: ReduceMotion.System,
            });
            iconHeight.value = withTiming(200, {
                duration: 300,
                easing: Easing.elastic(1),
                reduceMotion: ReduceMotion.System,
            });
            starTranslateX.value = 0;
            starTranslateY.value = 0;
            starScale.value = 1;
        }
    }


    const goBack = () => {
        opacity.value = withTiming(0, {
            duration: 300,
            easing: Easing.elastic(1),
            reduceMotion: ReduceMotion.System,
        });
        iconWidth.value = withTiming(0, {
            duration: 300,
            easing: Easing.elastic(1),
            reduceMotion: ReduceMotion.System,
        });
        iconHeight.value = withTiming(0, {
            duration: 300,
            easing: Easing.elastic(1),
            reduceMotion: ReduceMotion.System,
        });

        homeIconHeight.value = 180;
        homeIconWidth.value = 180;
        starTranslateX.value = 0;
        starTranslateY.value = 0;
        starScale.value = 1;
    }

    useEffect(() => {
        if (map.name !== "") {
            infoTranslateX.value = withTiming(0, {duration: 300});
        }
    }, [map])


    useEffect(() => {
        if (page === "home" && !randomLoading) {
            homeIconHeight.value = withRepeat(withTiming(200, {duration: 1000}), -1, true);
            homeIconWidth.value = withRepeat(withTiming(200, {duration: 1000}), -1, true);

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
        }
    });

    useEffect(() => {
        console.log(iconHeight)
        console.log(iconWidth)
    }, [iconHeight, iconWidth])

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View style={styles.container}>
            {
                page === "home" ?
                    map.name === "" && !randomLoading ? (
                        <SafeAreaView style={{position: "relative", width: "100%", height: "100%"}}>
                            <Animated.Image
                                source={require('./assets/star.png')}
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
                            />
                            <View style={[styles.randomMapContainer, styles.fullSize]}>
                                <View style={styles.imageContainer}>
                                    <Animated.Image
                                        source={require('./assets/icon.png')}
                                        style={{
                                            width: homeIconWidth,
                                            height: homeIconHeight,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </View>
                                <CustomButton
                                    style={styles.CTAButton}
                                    textStyle={styles.CTAButtonText}
                                    onPress={async () => {
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                                        await generateRandomMap();
                                    }}
                                >
                                    Choisir une carte
                                </CustomButton>
                                <CustomButton
                                    style={[styles.CTAButton, {marginTop: 0}]}
                                    textStyle={styles.CTAButtonText}
                                    onPress={() => {
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                                        setPage("maps");
                                    }}
                                >
                                    Voir toutes les cartes
                                </CustomButton>
                            </View>
                        </SafeAreaView>
                    ) : randomLoading ? (
                            <Animated.View style={[styles.loadingContainer, shuffleAnimatedStyle]}>
                                <LoadingCarousel/>
                            </Animated.View>
                        ) :
                        (
                            <View style={styles.container}>
                                {
                                    map.boardView ? (
                                        <Image
                                            source={map.boardView}
                                            style={[styles.fullSize, {
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                resizeMode: "cover",
                                            }]}
                                        />) : (
                                        <View style={[styles.fullSize, {
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
                                    style={[styles.fullSize, {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                                    }]}>
                                    <View
                                        style={[styles.randomMapContainer, {
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
                                                style={[styles.CTAButton, {
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
                                                    resetMap()
                                                    goBack()
                                                }}
                                            >
                                                <ArrowBigLeft color="white" size={26}/>
                                            </CustomButton>
                                            <CustomButton
                                                style={[styles.CTAButton, {flex: 1}]}
                                                textStyle={styles.CTAButtonText}
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
                        ) : page === "maps" ? (
                        <SafeAreaView style={{position: "relative", width: "100%", height: "100%"}}>
                            <View style={{margin: 20}}>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 2,
                                }}>
                                    <CustomButton
                                        style={[{
                                            backgroundColor: nintendoColor,
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
                                            resetMap()
                                            goBack()
                                            setPage("home")
                                        }}
                                    >
                                        <ArrowBigLeft color="white" size={26}/>
                                    </CustomButton>
                                    <Text style={{
                                        fontFamily: "ShinGoPro-Bold",
                                        fontSize: 24,
                                        textAlign: "center",
                                        color: nintendoColor,
                                        margin: 20,
                                    }}>

                                        Super Mario Party Jamboree Maps
                                    </Text>
                                </View>
                                <MapsDisplay/>
                            </View>
                        </SafeAreaView>
                    ) : (
                        <View style={styles.container}>
                            <Text>Page not found</Text>
                        </View>
                    )
            }
        </View>
    )
        ;
}

const styles = StyleSheet.create({
    loadingContainer: {flex: 1, alignItems: "center", justifyContent: "center"},
    loadingText: {color: "#fff", fontSize: 18, fontWeight: "bold"},
    overlay: {flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.8)"},
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
        width: "100%",
        height: "100%",
    },
    randomMapContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    fullSize: {
        width: "100%",
        height: "100%",
    },
    CTAButton: {
        marginTop: 25,
        backgroundColor: "red",
        width: 300,
    },
    CTAButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Super-Mario",
    },
    imageContainer: {
        height: 200,
        width: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    star: {
        position: 'absolute',
        width: 60,
        height: 60,
    },
});
