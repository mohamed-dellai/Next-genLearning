import { create } from "zustand";

const usePointsStore = create((set) => ({
    points: 0, // Initial points

    // Action to add points
    addPoints: (amount) => set((state) => ({ points: state.points + amount })),
    setPoints: (amount) => set((state) => ({ points: amount })),

    // Optional: Reset points if needed
    resetPoints: () => set({ points: 0 }),
}));

export default usePointsStore;
