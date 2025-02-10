import {ScrollView, StyleSheet} from 'react-native';
import {boards} from '../../models/boards';
import AnimatedCard from "./AnimatedCard";

const BoardsDisplay = () => {
    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            {boards.map((item, index) => (
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

export default BoardsDisplay;