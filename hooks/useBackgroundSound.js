import {useEffect, useState} from 'react';
import {Audio} from 'expo-av';

const useBackgroundSound = (soundUri, shouldPlay = false, isLooping = false, options = {}) => {
    const [sound, setSound] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadSound = async () => {
        if (!soundUri) {
            console.error("No sound URI provided");
            return;
        }

        try {
            const {sound} = await Audio.Sound.createAsync(
                soundUri,
                {
                    shouldPlay: shouldPlay,
                    isLooping: isLooping,
                    volume: 0.5,
                    ...options
                }
            );
            setSound(sound);
            setIsLoaded(true);
        } catch (err) {
            console.error("Error loading sound:", err);
        }
    };

    const stopSound = async () => {
        if (sound) {
            try {
                const status = await sound.getStatusAsync();
                if (status.isLoaded) {
                    if (status.isPlaying) {
                        await sound.stopAsync();
                    }
                }
                await sound.unloadAsync();
                setSound(null);
                setIsLoaded(false);
            } catch (error) {
                console.error("Error stopping sound:", error);
            }
        }
    };

    const toggleSoundMusic = async () => {
        try {
            if (sound) {
                const status = await sound.getStatusAsync();
                if (status.isLoaded) {
                    if (status.isPlaying) {
                        await sound.pauseAsync();
                    } else {
                        await sound.playAsync();
                    }
                }
            } else {
                await loadSound();
                if (shouldPlay) {
                    await sound.playAsync();
                }
            }
        } catch (error) {
            console.error("Error toggling sound:", error);
        }
    };

    useEffect(() => {
        loadSound();
        return () => {
            stopSound();
        };
    }, [soundUri]);

    return {
        sound,
        toggleSoundMusic,
        stopSound,
        isLoaded
    };
};

export default useBackgroundSound;
