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


export const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};