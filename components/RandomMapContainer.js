import React, {useEffect} from 'react';
import {Text, View} from "react-native";
import {globalStyles} from "../styles/globalStyles";
import Animated, {useSharedValue, withTiming} from "react-native-reanimated";
import {useMapStore} from "../store/store";

const RandomMapContainer = ({infoTranslateX, opacity}) => {
    const {map} = useMapStore();

    const iconWidth = useSharedValue(0);
    const iconHeight = useSharedValue(0);

    useEffect(() => {
        iconWidth.value = withTiming(180, {duration: 300});
        iconHeight.value = withTiming(180, {duration: 300});
    }, []);

    return (
        <View style={[globalStyles.centeredContainer, {
            padding: 20,
        }]}>
            <Animated.Image
                source={map.boardIcon}
                style={{
                    width: iconWidth,
                    height: iconHeight,
                    opacity: opacity,
                    resizeMode: 'contain',
                    transform: [{translateX: infoTranslateX}]
                }}
            />
            <Text style={{
                fontFamily: "ShinGoPro-Bold",
                fontSize: 24,
                textAlign: "center",
                color: "white",
                marginTop: 20,
            }}>
                {map.name}
            </Text>
            <Text style={{
                fontFamily: "ShinGoPro",
                fontSize: 14,
                textAlign: "center",
                paddingTop: 10,
                opacity: 0.7,
                color: "white",
                maxWidth: 300,
            }}>
                {map.description}
            </Text>
        </View>
    );
};

export default RandomMapContainer;
