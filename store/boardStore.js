import {create} from "zustand";
import {boards} from "../models/boards";

export const useBoardStore = create((set) => ({
    board: {
        id: 0,
        name: "",
        description: "",
        boardView: "",
        boardIcon: "",
        sound: "",
    },
    setBoard: (board) => set({board}),
    generateBoard: (prevBoard = null) => {
        if (boards.length === 0) return;

        if (boards.length === 1) {
            const onlyItem = boards[0];
            set({
                board: {
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
            randomItem = boards[Math.floor(Math.random() * boards.length)];
        } while (prevBoard && randomItem.id === prevBoard.id);

        set({
            board: {
                id: randomItem.id,
                name: randomItem.name,
                description: randomItem.description,
                boardView: randomItem.boardView,
                boardIcon: randomItem.boardIcon,
                sound: randomItem.sound
            }
        });
    },
    resetBoard: () => {
        useBoardStore.getState().setBoard({
            id: 0,
            name: "",
            description: "",
            boardView: "",
            boardIcon: "",
            sound: "",
        })
    },
}));
