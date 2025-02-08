/**
 * @param {array} array
 * @returns {array}
 * @description Shuffle the given array.
 */
export const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};


/**
 * The following functions could be used.
 *
 * These functions were used at the beginning of the project and I decided to leave them in.
 *
 * First, the fadeOutSound function will fade out the sound over a specified duration.
 * Second, the fadeInSound function will fade in the sound over a specified duration.
 * Finally, the toggleMusic function will toggle the music on and off.
 */
export const fadeOutSound = async (sound, duration = 1000) => {
    if (!sound) return;

    const steps = 20;
    const stepDuration = duration / steps;

    const currentVolume = await sound.getStatusAsync().then(status => status.volume ?? 0.5);
    const volumeStep = currentVolume / steps;

    for (let i = steps; i >= 0; i--) {
        const volume = i * volumeStep;
        await sound.setVolumeAsync(volume);
        await new Promise(resolve => setTimeout(resolve, stepDuration));
    }

    await sound.stopAsync();
    await sound.setVolumeAsync(0);
};

export const fadeInSound = async (sound, duration = 1000) => {
    if (!sound) return;

    const steps = 20;
    const stepDuration = duration / steps;
    let volumeStep = 1 / steps;

    await sound.setVolumeAsync(0);
    await sound.playAsync();

    for (let i = 0; i <= steps; i++) {
        const volume = i * volumeStep;
        await sound.setVolumeAsync(volume);
        await new Promise(resolve => setTimeout(resolve, stepDuration));
    }

    await sound.setVolumeAsync(0.5);
};

export const toggleMusic = async (sound, duration = 1000) => {
    if (!sound) return;

    const status = await sound.getStatusAsync();

    if (status.isPlaying) {
        await fadeOutSound(sound, duration);
    } else {
        await sound.setVolumeAsync(0.5);
        await sound.playAsync();
    }
}
