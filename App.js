import {View} from 'react-native';
import {useStore} from "./store/store";
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen/build/index";
import {Audio} from "expo-av";
import Home from "./pages/Home";
import RandomMap from "./pages/RandomMap";
import RandomMapGeneration from "./pages/RandomMapGeneration";
import NotFound from "./pages/NotFound";
import {globalStyles} from "./styles/globalStyles";
import Maps from "./pages/Maps";
import {fadeOutSound} from "./utils";

export default function App() {
    const {
        map,
        generateMap,
        page
    } = useStore();

    const [sound, setSound] = useState(null);
    const [randomLoading, setRandomLoading] = useState(false);

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
                await sound.setVolumeAsync(1);
                await sound.playAsync();
            } else {
                await fadeOutSound(sound, 1000);
            }
        }
    };

    const generateRandomMap = async () => {
        await toggleRandomLoading();
    };

    const toggleRandomLoading = async () => {
        setRandomLoading(true);
        toggleMusic(true);

        await generateMap(map);

        setTimeout(() => {
            setRandomLoading(false);
            toggleMusic(false);
        }, 5000);
    };


    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View style={globalStyles.container}>
            {
                page === "home" ?
                    map.id === 0 && !randomLoading ? (
                        <Home generateRandomMap={generateRandomMap}/>
                    ) : randomLoading ? (
                        <RandomMapGeneration/>
                    ) : (
                        <RandomMap/>
                    ) : page === "maps" ? (
                        <Maps/>
                    ) : (
                        <NotFound/>
                    )
            }
        </View>
    );
}