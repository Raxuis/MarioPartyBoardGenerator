import React from 'react';
import {SafeAreaView, Text, View} from "react-native";
import CustomButton from "../components/CustomButton";
import {nintendoColor} from "../constants";
import * as Haptics from "expo-haptics";
import {ArrowBigLeft} from "lucide-react-native";
import MapsDisplay from "../components/MapsDisplay";
import {useStore} from "../store/store";
import {globalStyles} from "../styles/globalStyles";

const Maps = () => {
    const {resetMap, setPage} = useStore();
    return (
        <SafeAreaView style={[{position: "relative"}, globalStyles.fullSize]}>
            <View style={{margin: 20}}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                }}>
                    <CustomButton
                        style={[{
                            backgroundColor: nintendoColor,
                            padding: 2,
                            width: 50,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }]}
                        textStyle={{
                            fontSize: 12,
                            fontFamily: "ShinGoPro-Bold",
                        }}
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                            resetMap();
                            setPage("home")
                        }}
                    >
                        <ArrowBigLeft color="white" size={26}/>
                    </CustomButton>
                    <Text style={{
                        fontFamily: "ShinGoPro-Bold",
                        fontSize: 24,
                        textAlign: "center",
                        color: nintendoColor,
                        margin: 20,
                    }}>

                        Super Mario Party Jamboree Maps
                    </Text>
                </View>
                <MapsDisplay/>
            </View>
        </SafeAreaView>
    );
};

export default Maps;
