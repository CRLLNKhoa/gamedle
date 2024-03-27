import { create } from "zustand";

export const useGTBStore = create((set) => ({
  game: undefined,
  currHint: undefined,
  status: undefined,
  gameplayed: [],
  listAns: [],
  hintUnlock: 1,
  //   ---------------------------------------
  setGame: (data: any) => set((state: { game: any }) => ({ game: data })),
  setHintUnlock: () => set((state: { hintUnlock: number }) => ({ hintUnlock: state.hintUnlock + 1 })),
  setCurrHint: (data: any) =>
    set((state: { currHint: any }) => ({ currHint: data })),
  setStatus: (data: any) => set((state: { status: any }) => ({ status: data })),
  setGamePlayed: (data: any) => set((state: { gameplayed: any }) => ({ gameplayed: data })),
  setListAns: (data: any) => set((state: { listAns: any }) => ({ listAns: data })),
}));
