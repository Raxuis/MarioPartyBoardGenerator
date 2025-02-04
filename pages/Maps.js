import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { nintendoColor } from "../constants";
import * as Haptics from "expo-haptics";
import { ArrowBigLeft } from "lucide-react-native";
import MapsDisplay from "../components/MapsDisplay";
import { useStore } from "../store/store";

const Maps = () => {
    const { resetMap, setPage } = useStore();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <CustomButton
                    style={styles.backButton}
                    textStyle={styles.backButtonText}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        resetMap();
                        setPage("home");
                    }}
                >
                    <ArrowBigLeft color="white" size={26} />
                </CustomButton>
                <Text style={styles.title}>
                    Super Mario Party Jamboree Maps
                </Text>
            </View>
            <View style={styles.mapsWrapper}>
                <View style={styles.mapsContainer}>
                    <MapsDisplay />
                </View>
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
    },
    mapsWrapper: {
        flex: 1,
        marginHorizontal: 20,
    },
    mapsContainer: {
        flex: 1,
        borderRadius: 10,
        overflow: "hidden",
        marginVertical: 10,
    },
});

export default Maps;