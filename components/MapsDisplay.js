import React, {useState, useEffect} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {data} from '../constants';

const gameColors = {
    'Super Mario Party Jamboree': '#FF5733',
    'Mario Party Superstars': '#3498db',
    'Mario Party 10': '#2ecc71',
    'Mario Party 9': '#f1c40f',
};

const getRandomGameColor = (prevColor) => {
    const colors = Object.values(gameColors);
    let newColor;

    do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (newColor === prevColor);

    return newColor;
};

const MapsDisplay = () => {
    const [colors, setColors] = useState([]);

    useEffect(() => {
        const generatedColors = [];
        let prevColor = null;

        data.forEach(() => {
            const newColor = getRandomGameColor(prevColor);
            generatedColors.push(newColor);
            prevColor = newColor;
        });

        setColors(generatedColors);
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{display: "flex", justifyContent: "center", alignItems: 'center', padding: 20}}>
            {data.map((item, index) => (
                <View
                    key={index}
                    style={{
                        backgroundColor: colors[index] || '#000',
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 20,
                        width: 350,
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 5,
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#fff',
                        fontFamily: "ShinGoPro-Bold"
                    }}>{item.name}</Text>
                    <Image
                        source={item.boardView}
                        style={{width: 300, height: 150, marginVertical: 10, borderRadius: 10}}
                        resizeMode="cover"
                    />
                    <Text style={{
                        fontSize: 16,
                        color: '#fff',
                        textAlign: 'center',
                        fontFamily: "ShinGoPro"
                    }}>{item.description}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

export default MapsDisplay;
