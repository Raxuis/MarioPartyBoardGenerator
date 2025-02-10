import {fadeOutSound} from "./fadeOutSound";

export const toggleSound = async (sound, duration = 1000) => {
    if (!sound) return;

    const status = await sound.getStatusAsync();

    if (status.isPlaying) {
        await fadeOutSound(sound, duration);
    } else {
        await sound.setVolumeAsync(0.5);
        await sound.playAsync();
    }
}