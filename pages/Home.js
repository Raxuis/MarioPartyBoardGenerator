import {SafeAreaView, View} from "react-native";
import MarioPartyButton from "../components/ui/MarioPartyButton";
import * as Haptics from "expo-haptics";
import {usePageStore} from "../store/store";
import {globalStyles} from "../styles/globalStyles";
import Star from "../components/Star";
import GameLogo from "../components/GameLogo";

export default function Home({toggleMapsMusic, generateRandomMap}) {
    const {setPage} = usePageStore();

    return (
        <SafeAreaView style={[{position: "relative"}, globalStyles.fullSize]}>

            <Star/>

            <View style={[globalStyles.centeredContainer, globalStyles.fullSize]}>
                <GameLogo/>

                <MarioPartyButton
                    triangle={true}
                    primary={true}
                    type={"forward"}
                    onPress={async () => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        await generateRandomMap();
                    }}
                >
                    Générer une carte
                </MarioPartyButton>
                <MarioPartyButton
                    style={{marginTop: 15}}
                    triangle={true}
                    type={"forward"}
                    onPress={async () => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        await toggleMapsMusic();
                        setTimeout(() => {
                            setPage("maps");
                        }, 300);
                    }}
                >
                    Voir toutes les cartes
                </MarioPartyButton>
            </View>
        </SafeAreaView>
    );
}
