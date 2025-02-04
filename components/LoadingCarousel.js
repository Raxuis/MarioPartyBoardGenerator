import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, Dimensions, Animated, StyleSheet} from 'react-native';
import {data} from '../constants';

const {width} = Dimensions.get('window');

const LoadingCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;

            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
            }

            setCurrentIndex(nextIndex);
        }, 1000);

        return () => clearInterval(interval);
    }, [currentIndex]);

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
                data={data}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
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