import { create } from "zustand";

interface DataTransaction {
    dataChange: boolean;
    setDataChange: (dataChange: boolean) => void;
}

export const dataTransaction = () => {
    const useDataTransaction = create<DataTransaction>((set) => ({
        dataChange: false,
        setDataChange: (dataChange) => set({ dataChange }),
    }));

    return {useDataTransaction};
};
