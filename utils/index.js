export const fadeOutSound = async (sound, duration = 1000) => {
    if (!sound) return;

    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = 1 / steps;

    for (let i = steps; i >= 0; i--) {
        const volume = i * volumeStep;
        await sound.setVolumeAsync(volume);
        await new Promise(resolve => setTimeout(resolve, stepDuration));
    }

    await sound.stopAsync();
    await sound.setVolumeAsync(1);
};