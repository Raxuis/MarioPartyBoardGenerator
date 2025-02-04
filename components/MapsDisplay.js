import React, {useState, useEffect} from 'react';
import {Text, Image, ScrollView, View} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {data} from '../constants';
import {getRandomGameColor} from "../utils";
import {globalStyles} from "../styles/globalStyles";
import {BlurView} from "expo-blur";

const AnimatedCard = ({item, color}) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(50);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, {duration: 500}),
            transform: [
                {
                    translateY: withTiming(translateY.value, {duration: 500})
                }
            ]
        };
    });

    useEffect(() => {
        opacity.value = 1;
        translateY.value = 0;
    }, []);

    return (
        <Animated.View
            style={[
                {
                    width: "100%",
                    borderRadius: 20,
                    marginBottom: 20,
                    alignItems: 'center',
                    elevation: 5,
                    position: 'relative',
                },
                animatedStyle
            ]}
        >
            <Image
                source={item.boardView}
                style={[
                    {
                        overflow: 'hidden',
                        borderRadius: 20,
                    }, globalStyles.Inset0Element, globalStyles.fullSize]}
            />
            <BlurView
                intensity={20}
                tint="dark"
                style={[
                    globalStyles.fullSize,
                    globalStyles.Inset0Element,
                    {
                        overflow: 'hidden',
                        borderRadius: 20
                    }
                ]}
            />
            <View style={[{
                padding: 15,
                alignItems: 'center',
                justifyContent: 'center',
            }]}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#fff',
                    fontFamily: "ShinGoPro-Bold",
                    textAlign: "center",
                }}>{item.name}</Text>

                <Image
                    source={item.boardView}
                    style={{width: 300, height: 150, marginVertical: 10, borderRadius: 20, overflow: "hidden"}}
                    resizeMode="cover"
                />
                <Text style={{
                    fontSize: 16,
                    color: '#fff',
                    textAlign: 'center',
                    fontFamily: "ShinGoPro",
                }}>{item.description}</Text>
            </View>
        </Animated.View>
    );
};

const MapsDisplay = () => {
    const [colors, setColors] = useState([]);

    useEffect(() => {
        const generatedColors = [];
        let prevColor = null;
        data.forEach(() => {
            const newColor = getRandomGameColor(prevColor);
            generatedColors.push(newColor);
            prevColor = newColor;
        });
        setColors(generatedColors);
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                paddingBottom: 180,
            }}
        >
            {data.map((item, index) => (
                <AnimatedCard
                    key={index}
                    item={item}
                    color={colors[index]}
                />
            ))}
        </ScrollView>
    );
};

export default MapsDisplay;