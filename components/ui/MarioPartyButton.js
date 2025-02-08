import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../../styles/globalStyles";
import {BUTTON_SOUNDS} from "../../constants";
import useButtonSound from '../../hooks/useButtonSound';

const MarioPartyButton = ({
                          children,
                          style,
                          textStyle,
                          onPress,
                          primary,
                          type
                      }) => {
    const soundSource = type === "forward" ? BUTTON_SOUNDS.FORWARD : BUTTON_SOUNDS.BACKWARD;
    const {playSound} = useButtonSound(soundSource);

    const handlePress = async () => {
        await playSound();
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

export default MarioPartyButton;