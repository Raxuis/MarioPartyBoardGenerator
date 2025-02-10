import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, Dimensions, Animated, StyleSheet} from 'react-native';
import * as Haptics from 'expo-haptics';
import {CAROUSEL_DURATION} from '../../constants';
import {shuffleArray} from "../../utils";
import {useBoardStore} from "../../store/boardStore";
import {boards} from "../../models/boards";

const {width} = Dimensions.get('window');

const LoadingCarousel = () => {
    const [shuffledBoards, setShuffledBoards] = useState([]);
    const flatListRef = useRef(null);
    const currentIndexRef = useRef(0);
    const {board} = useBoardStore();

    useEffect(() => {
        if (board.id !== 0) {
            const dataWithoutBoard = boards.filter(item => item.id !== board.id);
            let shuffledWithoutBoard = shuffleArray(dataWithoutBoard);
            const finalData = [...shuffledWithoutBoard, board];
            setShuffledBoards(finalData);
        }
    }, [board]);

    useEffect(() => {
        if (shuffledBoards.length === 0) return;

        // 👇Duration of each interval for carousel to move to next item
        const intervalDuration = Math.floor(CAROUSEL_DURATION / shuffledBoards.length);

        const interval = setInterval(() => {
            const nextIndex = currentIndexRef.current === shuffledBoards.length - 1
                ? 0
                : currentIndexRef.current + 1;

            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
            }

            // 👇Haptic feedback light for all items except the last one which is heavy
            if (nextIndex === shuffledBoards.length - 1) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            } else {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }

            currentIndexRef.current = nextIndex;
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [shuffledBoards]);

    const renderItem = ({item}) => (
        <View style={styles.carouselItem}>
            <Image
                source={item.boardIcon}
                style={styles.carouselImage}
                resizeMode="contain"
            />
            <Text style={styles.carouselTitle}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.carouselContainer}>
            <Animated.FlatList
                ref={flatListRef}
                data={shuffledBoards}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `carousel-${item.id}-${index}`}
                renderItem={renderItem}
                getItemLayout={(data, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
                initialNumToRender={3}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    carouselItem: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    carouselImage: {
        width: 200,
        height: 200,
    },
    carouselTitle: {
        marginTop: 10,
        fontSize: 18,
        fontFamily: 'ShinGoPro-Bold',
        color: 'white',
        textAlign: 'center',
    }
});

export default LoadingCarousel;
