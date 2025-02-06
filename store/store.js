import {create} from "zustand";
import {MAPS} from "../constants";

export const useStore = create((set) => ({
    map: {
        id: 0,
        name: "",
        description: "",
        boardView: "",
        boardIcon: "",
        sound: "",
    },
    setMap: (map) => set({map}),
    generateMap: (prevMap = null) => {
        if (MAPS.length === 0) return;

        if (MAPS.length === 1) {
            const onlyItem = MAPS[0];
            set({
                map: {
                    id: onlyItem.id,
                    name: onlyItem.name,
                    description: onlyItem.description,
                    boardView: onlyItem.boardView,
                    boardIcon: onlyItem.boardIcon,
                    sound: onlyItem.sound
                }
            });
            return;
        }

        let randomItem;
        do {
            randomItem = MAPS[Math.floor(Math.random() * MAPS.length)];
        } while (prevMap && randomItem.id === prevMap.id);

        set({
            map: {
                id: randomItem.id,
                name: randomItem.name,
                description: randomItem.description,
                boardView: randomItem.boardView,
                boardIcon: randomItem.boardIcon,
                sound: randomItem.sound
            }
        });
    },
    page: "home",
    setPage: (page) => set({page}),
    resetMap: () => {
        useStore.getState().setMap({
            id: 0,
            name: "",
            description: "",
            boardView: "",
            boardIcon: "",
            sound: "",
        })
    },
}));