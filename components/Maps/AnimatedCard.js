import React, {useEffect} from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {Image, Text, View, StyleSheet, Dimensions} from "react-native";
import {globalStyles} from "../../styles/globalStyles";
import {BlurView} from "expo-blur";

const {width} = Dimensions.get('window');

const AnimatedCard = ({item}) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(50);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withTiming(opacity.value, {duration: 500}),
        transform: [{
            translateY: withTiming(translateY.value, {duration: 500})
        }]
    }));

    useEffect(() => {
        opacity.value = 1;
        translateY.value = 0;
    }, []);

    return (
        <Animated.View style={[styles.card, animatedStyle]}>
            <Image
                source={item.boardView}
                style={[styles.backgroundImage, globalStyles.Inset0Element]}
            />
            <BlurView
                intensity={20}
                tint="dark"
                style={[styles.blurView, globalStyles.Inset0Element]}
            />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Image
                    source={item.boardView}
                    style={styles.cardImage}
                    resizeMode="cover"
                />
                <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width - 40,
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 5,
        position: 'relative',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    blurView: {
        position: 'absolute',
        borderRadius: 20,
    },
    cardContent: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: "ShinGoPro-Bold",
        textAlign: "center",
    },
    cardImage: {
        width: width - 80,
        height: (width - 80) * 0.5,
        marginVertical: 10,
        borderRadius: 20,
    },
    cardDescription: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontFamily: "ShinGoPro",
    },
});

export default AnimatedCard;
