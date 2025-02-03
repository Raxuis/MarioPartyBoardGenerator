import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('./assets/icon.png')}
                style={{
                    width: 200,
                    height: 200,
                    resizeMode: 'contain',
                }}
            />
            <TouchableOpacity>
                <CustomButton
                    style={{
                        backgroundColor: "red",
                        width: 200,
                        elevation: 3
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
            </TouchableOpacity>
            {
                map && (
                    <Text>
                        {map.name}
                    </Text>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
