import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from "./components/CustomButton";
import {useStore} from "./store/store";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import * as SplashScreen from "expo-splash-screen/build/index";
import Animated, {withTiming, Easing, useSharedValue} from 'react-native-reanimated';


export default function App() {
    const {map, generateMap, setMap} = useStore();
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
    const width = useSharedValue(0);
    const height = useSharedValue(0);

    useEffect(() => {
        console.log(map);
    }, [map]);

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
                map.name === "" ? (
                    <View style={styles.randomMapContainer}>
                        <Image
                            source={require('./assets/icon.png')}
                            style={{
                                width: 200,
                                height: 200,
                                resizeMode: 'contain',
                            }}
                        />
                        <CustomButton
                            style={styles.CTAButton}
                            textStyle={styles.CTAButtonText}
                            onPress={() => {
                                generateMap();
                                opacity.value = withTiming(1, {
                                    duration: 300,
                                    easing: Easing.elastic(1),
                                });
                                width.value = withTiming(200, {
                                    duration: 300,
                                    easing: Easing.elastic(1),
                                });
                                height.value = withTiming(200, {
                                    duration: 300,
                                    easing: Easing.elastic(1),
                                });
                            }}
                        >
                            Choisir une carte
                        </CustomButton>
                    </View>
                ) : (
                    <View style={styles.container}>
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
                        />
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
                                        width: width,
                                        height: height,
                                        opacity: opacity,
                                        resizeMode: 'contain',
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
                                <CustomButton
                                    style={styles.CTAButton}
                                    textStyle={styles.CTAButtonText}
                                    onPress={() => {
                                        setMap({
                                            id: 0,
                                            name: "",
                                            description: "",
                                            boardView: "",
                                            boardIcon: ""
                                        })
                                        opacity.value = withTiming(0, {
                                            duration: 300,
                                            easing: Easing.elastic(1),
                                        });
                                        width.value = withTiming(0, {
                                            duration: 300,
                                            easing: Easing.elastic(1),
                                        });
                                        height.value = withTiming(0, {
                                            duration: 300,
                                            easing: Easing.elastic(1),
                                        });
                                    }}
                                >
                                    Réinitialiser
                                </CustomButton>
                            </View>
                        </View>
                    </View>
                )
            }
        </View>
    )
        ;
}

const styles = StyleSheet.create({
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
        color: "yellow",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Super-Mario",
    }
});
