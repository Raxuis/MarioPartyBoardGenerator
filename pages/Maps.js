import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { nintendoColor } from "../constants";
import MapsDisplay from "../components/MapsDisplay";
import * as Haptics from "expo-haptics";
import CustomButton from "../components/CustomButton";
import {useStore} from "../store/store";

const Maps = () => {
    const { resetMap, setPage } = useStore();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Super Mario Party Jamboree Maps
                </Text>
            </View>
            <View style={styles.mapsWrapper}>
                <View style={styles.mapsContainer}>
                    <MapsDisplay />
                </View>
            </View>

            <View style={styles.buttonWrapper}>
                <CustomButton
                    primary={false}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        resetMap();
                        setPage("home");
                    }}
                >
                    Retour
                </CustomButton>
            </View>
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
        backgroundColor: nintendoColor,
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
        color: nintendoColor,
        marginLeft: 20,
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