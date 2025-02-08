import {SafeAreaView, Text, View, StyleSheet} from "react-native";
import {NINTENDO_COLOR} from "../constants";
import MapsDisplay from "../components/Maps/MapsDisplay";
import * as Haptics from "expo-haptics";
import MarioPartyButton from "../components/ui/MarioPartyButton";
import {usePageStore, useMapStore} from "../store/store";
import Animated, {useSharedValue, withTiming} from "react-native-reanimated";
import {useEffect} from "react";

const Maps = ({toggleMapsMusic}) => {
    const {resetMap} = useMapStore();
    const {setPage} = usePageStore();
    const opacity = useSharedValue(1);

    const goBack = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        opacity.value = withTiming(0, {duration: 300});

        try {
            await toggleMapsMusic();
            setTimeout(() => {
                resetMap();
                setPage("home");
            }, 300);
        } catch (error) {
            console.error("Error in goBack:", error);
            resetMap();
            setPage("home");
        }
    }

    useEffect(() => {
        return () => {
            opacity.value = 1;
        };
    }, []);

    return (
        <SafeAreaView style={[styles.container]}>
            <Animated.View style={[{opacity}]}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Les 7 Cartes Disponibles
                    </Text>
                </View>
                <View style={styles.mapsWrapper}>
                    <View style={styles.mapsContainer}>
                        <MapsDisplay/>
                    </View>
                </View>

                <View style={styles.buttonWrapper}>
                    <MarioPartyButton
                        primary={false}
                        type="back"
                        onPress={goBack}
                    >
                        Retour
                    </MarioPartyButton>
                </View>
            </Animated.View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backButton: {
        backgroundColor: NINTENDO_COLOR,
        padding: 2,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    backButtonText: {
        fontSize: 12,
        fontFamily: "ShinGoPro-Bold",
    },
    title: {
        fontFamily: "ShinGoPro-Bold",
        fontSize: 24,
        color: NINTENDO_COLOR,
        flex: 1,
        textAlign: "center",
    },
    mapsWrapper: {
        flex: 1,
        marginHorizontal: 20,
    },
    mapsContainer: {
        flex: 1,
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 10,
    },
    buttonWrapper: {
        justifyContent: "flex-end",
        alignItems: "center",
    }
});

export default Maps;
