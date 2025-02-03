import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomButton from "./components/CustomButton";

export default function App() {
    return (
        <View style={styles.container}>
            <Image source={require('./assets/icon.png')} style={{
                width: 200,
                height: 200,
                resizeMode: 'contain',
            }}/>
            <TouchableOpacity>
                <CustomButton
                    style={{
                        backgroundColor: "red",
                        width: 200,
                        elevation: 3
                    }}
                    textStyle={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold"
                    }}
                    onPress={() => console.log('Button pressed')}
                >
                    Choisir une carte
                </CustomButton>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
