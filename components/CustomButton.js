import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../styles/globalStyles";
import {useEffect, useState} from "react";
import {Audio} from "expo-av";

const CustomButton = ({
                          children,
                          style,
                          textStyle,
                          onPress,
                          primary,
                          type
                      }) => {
    const [sound, setSound] = useState(null);
    useEffect(() => {
        const loadSound = async () => {
            const {sound} = await Audio.Sound.createAsync(
                type === "forward"
                    ? require('../assets/sounds/click-forward.mp3')
                    : require('../assets/sounds/click-back.mp3'),
                {shouldPlay: false}
            );
            setSound(sound);
        };

        loadSound();

        return () => {
            sound?.unloadAsync();
        };
    }, []);

    const handlePress = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.setPositionAsync(0);
            await sound.playAsync();
        } else {
            const {sound: newSound} = await Audio.Sound.createAsync(
                type === "forward"
                    ? require('../assets/sounds/click-forward.mp3')
                    : require('../assets/sounds/click-back.mp3')
            );
            setSound(newSound);
            await newSound.playAsync();
        }

        if (onPress) {
            onPress();
        }
    };


    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[primary ? globalStyles.CTAButtonPrimary : globalStyles.CTAButtonSecondary, style]}
        >
            <View style={styles.content}>
                {primary && <View style={globalStyles.CTATriangle}/>}
                <Text style={[globalStyles.CTAButtonText, textStyle]}>{children}</Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default CustomButton;
