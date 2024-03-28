import { create } from "zustand";

export const useGTAStore = create((set) => ({
  game: undefined,
  currHint: {hint: 1, time: 2000},
  status: undefined,
  gameplayed: [],
  listAns: [],
  hintUnlock: 1,
  isPlaying: false,
  start: false,
  //   ---------------------------------------
  setGame: (data: any) => set((state: { game: any }) => ({ game: data })),
  setIsPlaying: () => set((state: { isPlaying: boolean }) => ({ isPlaying: !state.isPlaying })),
  setStart: () => set((state: { start: boolean }) => ({ start: !state.start })),
  setHintUnlock: () => set((state: { hintUnlock: number }) => ({ hintUnlock: state.hintUnlock + 1 })),
  setCurrHint: (data: any) =>
    set((state: { currHint: any }) => ({ currHint: data })),
  setStatus: (data: any) => set((state: { status: any }) => ({ status: data })),
  setGamePlayed: (data: any) => set((state: { gameplayed: any }) => ({ gameplayed: data })),
  setListAns: (data: any) => set((state: { listAns: any }) => ({ listAns: data })),
}));
