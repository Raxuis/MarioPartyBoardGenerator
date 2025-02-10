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