import {create} from "zustand/index";

export const usePageStore = create((set) => ({
    page: "home",
    setPage: (page) => set({page}),
}));
