import { create } from "zustand";

export const useGTGAdminStore = create((set) => ({
  list: [],
  //   ---------------------------------------

  setList: (data: any) => set((state: { list: any }) => ({ list: data })),
}));