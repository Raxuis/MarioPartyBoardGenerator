import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from "./components/CustomButton";
import {useStore} from "./store/store";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import * as SplashScreen from "expo-splash-screen/build/index";

export default function App() {
    const {map, generateMap} = useStore();
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
                    <View style={[styles.randomMapContainer, {
                        maxWidth: 300,
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
                        }}>
                            {map.name}
                        </Text>
                        <Text style={{
                            fontFamily: "Super-Mario",
                            fontSize: 16,
                            textAlign: "center",
                            paddingTop: 10,
                        }}>
                            {map.description}
                        </Text>
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
    },
    randomMapContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
});
