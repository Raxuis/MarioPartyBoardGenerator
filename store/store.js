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
    generateMap: (prevMap = null) => {
        if (data.length === 0) return;

        if (data.length === 1) {
            const onlyItem = data[0];
            set({
                map: {
                    id: onlyItem.id,
                    name: onlyItem.name,
                    description: onlyItem.description,
                    boardView: onlyItem.boardView,
                    boardIcon: onlyItem.boardIcon,
                }
            });
            return;
        }

        let randomItem;
        do {
            randomItem = data[Math.floor(Math.random() * data.length)];
        } while (prevMap && randomItem.id === prevMap.id);

        set({
            map: {
                id: randomItem.id,
                name: randomItem.name,
                description: randomItem.description,
                boardView: randomItem.boardView,
                boardIcon: randomItem.boardIcon,
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
        })
    },
}));