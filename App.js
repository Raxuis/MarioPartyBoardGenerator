import {View} from 'react-native';
import {useStore} from "./store/store";
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen/build/index";
import Home from "./pages/Home";
import RandomMap from "./pages/RandomMap";
import RandomMapGeneration from "./pages/RandomMapGeneration";
import NotFound from "./pages/NotFound";
import {globalStyles} from "./styles/globalStyles";
import Maps from "./pages/Maps";
import useBackgroundSound from './hooks/useBackgroundSound';

export default function App() {
    const {
        map,
        generateMap,
        page
    } = useStore();

    const [randomLoading, setRandomLoading] = useState(false);

    const {
        sound: randomSound,
        toggleSoundMusic: toggleRandomSound
    } = useBackgroundSound(
        require('./assets/sounds/random.mp3'),
        false,
        false
    );

    const {
        sound: mapsSound,
        toggleSoundMusic: toggleMapsMusic
    } = useBackgroundSound(
        require('./assets/sounds/maps.mp3'),
        false,
        true
    );

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

    const generateRandomMap = async () => {
        await toggleRandomLoading();
    };

    const toggleRandomLoading = async () => {
        setRandomLoading(true);

        if (mapsSound) {
            await mapsSound.stopAsync();
            await mapsSound.setPositionAsync(0);
        }

        if (randomSound) {
            await randomSound.stopAsync();
            await randomSound.setPositionAsync(0);
            await randomSound.setVolumeAsync(0.5);
            await randomSound.playAsync();
        }

        await generateMap(map);

        setTimeout(async () => {
            setRandomLoading(false);
            if (randomSound) {
                await randomSound.stopAsync();
                await randomSound.setPositionAsync(0);
            }
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
                        <Home
                            generateRandomMap={generateRandomMap}
                            toggleMapsMusic={toggleMapsMusic}
                        />
                    ) : randomLoading ? (
                        <RandomMapGeneration/>
                    ) : (
                        <RandomMap/>
                    ) : page === "maps" ? (
                        <Maps
                            toggleMapsMusic={toggleMapsMusic}
                        />
                    ) : (
                        <NotFound/>
                    )
            }
        </View>
    );
}
