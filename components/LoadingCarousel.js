import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, Dimensions, Animated, StyleSheet} from 'react-native';
import * as Haptics from 'expo-haptics';
import {useStore} from '../store/store';
import {CAROUSEL_DURATION, data} from '../constants';
import {shuffleArray} from "../utils";

const {width} = Dimensions.get('window');

const LoadingCarousel = () => {
    const [shuffledData, setShuffledData] = useState([]);
    const flatListRef = useRef(null);
    const currentIndexRef = useRef(0);
    const {map} = useStore();

    useEffect(() => {
        if (map.id !== 0) {
            const dataWithoutMap = data.filter(item => item.id !== map.id);
            let shuffledWithoutMap = shuffleArray(dataWithoutMap);
            const finalData = [...shuffledWithoutMap, map];
            setShuffledData(finalData);
        }
    }, [map]);

    useEffect(() => {
        if (shuffledData.length === 0) return;

        const intervalDuration = Math.floor(CAROUSEL_DURATION / shuffledData.length);

        const interval = setInterval(() => {
            const nextIndex = currentIndexRef.current === shuffledData.length - 1
                ? 0
                : currentIndexRef.current + 1;

            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
            }

            if (nextIndex === shuffledData.length - 1) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            } else {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }

            currentIndexRef.current = nextIndex;
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [shuffledData]);

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
                data={shuffledData}
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
