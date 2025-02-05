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
import {toggleMusic} from "./utils";

export default function App() {
    const {
        map,
        generateMap,
        page
    } = useStore();

    const [randomSound, setRandomSound] = useState(null);
    const [mapsSound, setMapsSound] = useState(null);
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
        async function loadRandomSound() {
            const {sound} = await Audio.Sound.createAsync(
                require('./assets/sounds/random.mp3'),
                {shouldPlay: false, isLooping: true}
            );
            setRandomSound(sound);
        }

        async function loadMapsSound() {
            const {sound} = await Audio.Sound.createAsync(
                require('./assets/sounds/maps.mp3'),
                {shouldPlay: false, isLooping: true}
            );
            setMapsSound(sound);
        }

        loadRandomSound();
        loadMapsSound();

        return () => {
            randomSound && randomSound.unloadAsync();
            mapsSound && mapsSound.unloadAsync();
        }
    }, []);

    const generateRandomMap = async () => {
      await toggleRandomLoading();
  };

  const toggleRandomLoading = async () => {
      setRandomLoading(true);
      await toggleMusic(randomSound, true);

      await generateMap(map);

      setTimeout(() => {
          setRandomLoading(false);
          toggleMusic(randomSound, false);
      }, 5000);
  };

    const toggleMapsMusics = async () => {
        mapsSound.getStatusAsync().then(status => {
            toggleMusic(mapsSound, !status.isPlaying);
        });
    }


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
                            toggleMapsMusics={toggleMapsMusics}
                        />
                    ) : randomLoading ? (
                        <RandomMapGeneration/>
                    ) : (
                        <RandomMap/>
                    ) : page === "maps" ? (
                        <Maps
                            toggleMapsMusics={toggleMapsMusics}
                        />
                    ) : (
                        <NotFound/>
                    )
            }
        </View>
    );
}
