import {ScrollView, StyleSheet} from 'react-native';
import {MAPS} from '../../constants';
import AnimatedCard from "./AnimatedCard";

const MapsDisplay = () => {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            {MAPS.map((item, index) => (
                <AnimatedCard
                    key={index}
                    item={item}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingVertical: 20,
    },
});

export default MapsDisplay;