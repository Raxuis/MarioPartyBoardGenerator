import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from "./components/CustomButton";
import {useStore} from "./store/store";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import * as SplashScreen from "expo-splash-screen/build/index";

export default function App() {
    const {map, generateMap, setMap} = useStore();
    const [loaded, error] = useFonts({
        'Super-Mario': require('./assets/fonts/SuperMario256.ttf'),
    });

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
                            style={{
                                backgroundColor: "red",
                                width: 300
                            }}
                            textStyle={{
                                color: "yellow",
                                fontSize: 16,
                                fontWeight: "bold",
                                fontFamily: "Super-Mario"
                            }}
                            onPress={generateMap}
                        >
                            Choisir une carte
                        </CustomButton>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <Image source={map.boardView} style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                        }}/>
                        <View style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                        }}>
                            <View style={[styles.randomMapContainer, {
                                padding: 20,
                            }]}>
                                <Image
                                    source={map.boardIcon}
                                    style={{
                                        width: 200,
                                        height: 200,
                                        resizeMode: 'contain',
                                    }}
                                />
                                <Text style={{
                                    fontFamily: "Super-Mario",
                                    fontSize: 24,
                                    textAlign: "center",
                                    color: "white"
                                }}>
                                    {map.name}
                                </Text>
                                <Text style={{
                                    fontFamily: "Super-Mario",
                                    fontSize: 12,
                                    textAlign: "center",
                                    paddingTop: 10,
                                    opacity: 0.7,
                                    color: "white"
                                }}>
                                    {map.description}
                                </Text>
                                <CustomButton
                                    style={{
                                        backgroundColor: "red",
                                        width: 300
                                    }}
                                    textStyle={{
                                        color: "yellow",
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        fontFamily: "Super-Mario",
                                    }}
                                    onPress={() => setMap({
                                        id: 0,
                                        name: "",
                                        description: "",
                                        boardView: "",
                                        boardIcon: ""
                                    })}
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
    }
});
