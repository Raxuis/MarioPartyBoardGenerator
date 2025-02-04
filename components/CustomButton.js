import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../styles/globalStyles";

const CustomButton = ({children, style, textStyle, onPress, primary}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
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
