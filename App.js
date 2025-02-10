import {View} from 'react-native';
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen/build/index";
import Home from "./pages/Home";
import RandomBoardGeneration from "./pages/RandomBoardGeneration";
import RandomBoard from "./pages/RandomBoard";
import {globalStyles} from "./styles/globalStyles";
import useBackgroundSound from './hooks/useBackgroundSound';
import {CAROUSEL_DURATION} from "./constants";
import {useBoardStore} from "./store/boardStore";
import {usePageStore} from "./store/pageStore";
import Boards from "./pages/Boards";

export default function App() {
    const {
        board,
        generateBoard
    } = useBoardStore();

    const {
        page
    } = usePageStore();

    const [randomLoading, setRandomLoading] = useState(false);

    const {
        sound: randomSound,
    } = useBackgroundSound(
        require('./assets/sounds/random.mp3'),
        false,
        false
    );

    const {
        sound: boardsSound,
        toggleSoundMusic: toggleBoardsMusic
    } = useBackgroundSound(
        require('./assets/sounds/boards.mp3'),
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

    const generateRandomBoard = async () => {
        await toggleRandomLoading();
    };

    const toggleRandomLoading = async () => {
        setRandomLoading(true);

        if (boardsSound) {
            await boardsSound.stopAsync();
            await boardsSound.setPositionAsync(0);
        }

        if (randomSound) {
            await randomSound.stopAsync();
            await randomSound.setPositionAsync(0);
            await randomSound.setVolumeAsync(0.5);
            await randomSound.playAsync();
        }

        await generateBoard(board);

        setTimeout(async () => {
            setRandomLoading(false);
            if (randomSound) {
                await randomSound.stopAsync();
                await randomSound.setPositionAsync(0);
            }
        }, CAROUSEL_DURATION);
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
                    board.id === 0 && !randomLoading ? (
                        <Home
                            generateRandomBoard={generateRandomBoard}
                            toggleBoardsMusic={toggleBoardsMusic}
                        />
                    ) : randomLoading ? (
                        <RandomBoardGeneration/>
                    ) : (
                        <RandomBoard/>
                    ) : page === "boards" ? (
                        <Boards
                            toggleBoardsMusic={toggleBoardsMusic}
                        />
                    ) : null
            }
        </View>
    );
}
