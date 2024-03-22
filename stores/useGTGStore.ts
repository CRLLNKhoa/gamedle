import { create } from "zustand";

export const useGTGStore = create((set) => ({
  game: undefined,
  currHint: undefined,
  status: undefined,
  gameplayed: [],
  //   ---------------------------------------

  setGame: (data: any) => set((state: { game: any }) => ({ game: data })),
  setCurrHint: (data: any) =>
    set((state: { currHint: any }) => ({ currHint: data })),
  setStatus: (data: any) => set((state: { status: any }) => ({ status: data })),
  setGamePlayed: (data: any) => set((state: { gameplayed: any }) => ({ gameplayed: data })),
}));
