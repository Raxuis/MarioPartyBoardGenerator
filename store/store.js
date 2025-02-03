import {create} from "zustand";
import {data} from "../constants";

export const useStore = create((set) => ({
    map: {
        id: 0,
        name: "",
        description: "",
        boardView: "",
        boardIcon: "",
    },
    setMap: (map) => set({map}),
    generateMap: () => {
        if (data.length === 0) return;
        const randomItem = data[Math.floor(Math.random() * data.length)];
        set({
            map: {
                id: randomItem.id ?? Math.random(),
                name: randomItem.name,
                description: randomItem.description,
                boardView: randomItem.boardView,
                boardIcon: randomItem.boardIcon,
            }
        });
    },
}));