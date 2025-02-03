import {StyleSheet, Text, TouchableOpacity} from "react-native";

const CustomButton = ({children, style, textStyle, onPress}) => {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default CustomButton;
