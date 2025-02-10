import {SafeAreaView, View} from "react-native";
import MarioPartyButton from "../components/ui/MarioPartyButton";
import * as Haptics from "expo-haptics";
import {globalStyles} from "../styles/globalStyles";
import Star from "../components/Star";
import GameLogo from "../components/GameLogo";
import {usePageStore} from "../store/pageStore";

export default function Home({toggleBoardsMusic, generateRandomBoard}) {
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
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        await generateRandomBoard();
                    }}
                >
                    Générer une carte
                </MarioPartyButton>
                <MarioPartyButton
                    style={{marginTop: 15}}
                    triangle={true}
                    type={"forward"}
                    onPress={async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        await toggleBoardsMusic();
                        setTimeout(() => {
                            setPage("boards");
                        }, 300);
                    }}
                >
                    Voir toutes les cartes
                </MarioPartyButton>
            </View>
        </SafeAreaView>
    );
}
