import Animated, {Easing, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import {Platform, SafeAreaView, StatusBar, View, StyleSheet, Dimensions} from "react-native";
import CustomButton from "../components/CustomButton";
import * as Haptics from "expo-haptics";
import {useStore} from "../store/store";
import {globalStyles} from "../styles/globalStyles";
import {useEffect} from "react";

export default function Home({generateRandomMap}) {
    const {setPage} = useStore();

    const windowWidth = Dimensions.get('window').width;

    const homeIconWidth = useSharedValue(180);
    const homeIconHeight = useSharedValue(180);

    const starTranslateX = useSharedValue(0);
    const starTranslateY = useSharedValue(0);
    const starScale = useSharedValue(1);

    useEffect(() => {
        homeIconHeight.value = withRepeat(withTiming(200, {duration: 1000}), -1, true);
        homeIconWidth.value = withRepeat(withTiming(200, {duration: 1000}), -1, true);

        starTranslateX.value = withRepeat(
            withTiming(windowWidth - 70, {
                duration: 3000,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            -1,
            true
        );

        starTranslateY.value = withRepeat(
            withTiming(100, {
                duration: 2000,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            -1,
            true
        );

        starScale.value = withRepeat(
            withTiming(1.2, {
                duration: 1000,
                easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            -1,
            true
        );

        return () => {
            homeIconWidth.value = 180;
            homeIconHeight.value = 180;
            starTranslateX.value = 0;
            starTranslateY.value = 0;
            starScale.value = 1;
        }
    });

    return (
        <SafeAreaView style={[{position: "relative"}, globalStyles.fullSize]}>
            <Animated.Image
                source={require('../assets/star.png')}
                style={[styles.star, {
                    top: Platform.OS === 'ios'
                        ? 50
                        : StatusBar.currentHeight + 10,
                    left: 10,
                    marginTop: 10,
                    transform: [
                        {translateX: starTranslateX},
                        {translateY: starTranslateY},
                        {scale: starScale}
                    ],
                }]}
            />
            <View style={[globalStyles.centeredContainer, globalStyles.fullSize]}>
                <View style={styles.imageContainer}>
                    <Animated.Image
                        source={require('../assets/icon.png')}
                        style={{
                            width: homeIconWidth,
                            height: homeIconHeight,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <CustomButton
                    triangle={true}
                    primary={true}
                    onPress={async () => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        await generateRandomMap();
                    }}
                >
                    Générer une carte
                </CustomButton>
                <CustomButton
                    style={{marginTop: 15}}
                    triangle={true}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        setPage("maps");
                    }}
                >
                    Voir toutes les cartes
                </CustomButton>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    star: {
        position: 'absolute',
        width: 60,
        height: 60,
    },
    imageContainer: {
        height: 200,
        width: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
})