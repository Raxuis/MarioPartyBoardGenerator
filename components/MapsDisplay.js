import React, {useState, useEffect} from 'react';
import {Text, Image, ScrollView} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {data} from '../constants';
import {getRandomGameColor} from "../utils";

const AnimatedCard = ({item, color, index}) => {
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
                    backgroundColor: color || '#000',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20,
                    width: 350,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 5,
                },
                animatedStyle
            ]}
        >
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff',
                fontFamily: "ShinGoPro-Bold"
            }}>{item.name}</Text>
            <Image
                source={item.boardView}
                style={{width: 300, height: 150, marginVertical: 10, borderRadius: 10}}
                resizeMode="cover"
            />
            <Text style={{
                fontSize: 16,
                color: '#fff',
                textAlign: 'center',
                fontFamily: "ShinGoPro"
            }}>{item.description}</Text>
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
                padding: 20,
                paddingBottom: 80
            }}
        >
            {data.map((item, index) => (
                <AnimatedCard
                    key={index}
                    item={item}
                    color={colors[index]}
                    index={index}
                />
            ))}
        </ScrollView>
    );
};

export default MapsDisplay;