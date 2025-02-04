import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
        width: "100%",
        height: "100%",
    },
    centeredContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    fullSize: {
        width: "100%",
        height: "100%",
    },
    CTAButton: {
        marginTop: 25,
        backgroundColor: "red",
        width: 300,
    },
    CTAButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Super-Mario",
    },
});