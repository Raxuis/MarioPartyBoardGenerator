import { useState, useEffect, useCallback } from 'react';
import { Audio } from 'expo-av';

const useButtonSound = (soundSource) => {
    const [sound, setSound] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSound = async () => {
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    soundSource,
                    { shouldPlay: false }
                );

                setSound(newSound);
                setIsLoaded(true);
                setError(null);
            } catch (err) {
                setError(err);
            }
        };

        loadSound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [soundSource]);

    const playSound = useCallback(async () => {
        if (sound) {
            try {
                await sound.stopAsync();
                await sound.setPositionAsync(0);
                await sound.playAsync();
            } catch (err) {
                setError(err);
            }
        } else {
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(soundSource);
                setSound(newSound);
                await newSound.playAsync();
            } catch (err) {
                setError(err);
            }
        }
    }, [sound]);

    return {
        sound,
        isLoaded,
        error,
        playSound
    };
};

export default useButtonSound;